import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, MessageCircle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price_usd: number;
  price_ngn: number;
  unit: string;
  image_url: string;
  stock_quantity: number;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

interface CartPageProps {
  onNavigate: (page: string) => void;
}

export function CartPage({ onNavigate }: CartPageProps) {
  const { user, profile } = useAuth();
  const { showToast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [checkoutForm, setCheckoutForm] = useState({
    delivery_address: '',
    delivery_phone: '',
    delivery_notes: '',
  });
  const [processingOrder, setProcessingOrder] = useState(false);

  useEffect(() => {
    if (user) loadCart();
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`id, product_id, quantity, product:product_id(*)`)
        .eq('user_id', user.id);
      if (error) throw error;
      setCartItems(data || []);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setUpdating(itemId);
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity: newQuantity })
        .eq('id', itemId);
      if (error) throw error;
      loadCart();
    } catch {
      showToast('Failed to update quantity', 'error');
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (itemId: string) => {
    setUpdating(itemId);
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId);
      if (error) throw error;
      showToast('Item removed from cart');
      loadCart();
    } catch {
      showToast('Failed to remove item', 'error');
    } finally {
      setUpdating(null);
    }
  };

  const handleWhatsAppCheckout = async () => {
    if (!user || !profile || cartItems.length === 0) return;

    if (!checkoutForm.delivery_address || !checkoutForm.delivery_phone) {
      showToast('Please enter delivery address and phone number', 'warning');
      return;
    }

    setProcessingOrder(true);

    try {
      const totalNGN = cartItems.reduce((sum, item) => sum + (item.product.price_ngn * item.quantity), 0);
      const totalUSD = cartItems.reduce((sum, item) => sum + (item.product.price_usd * item.quantity), 0);
      const reference = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total_amount_usd: totalUSD,
          total_amount_ngn: totalNGN,
          currency: 'NGN',
          delivery_address: checkoutForm.delivery_address,
          delivery_phone: checkoutForm.delivery_phone,
          delivery_notes: checkoutForm.delivery_notes,
          status: 'pending',
          payment_status: 'whatsapp_pending',
          payment_reference: reference,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = cartItems.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price_usd: item.product.price_usd,
        unit_price_ngn: item.product.price_ngn,
        subtotal_usd: item.product.price_usd * item.quantity,
        subtotal_ngn: item.product.price_ngn * item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      const itemsList = cartItems.map(item =>
        `${item.quantity}x ${item.product.name} - ₦${(item.product.price_ngn * item.quantity).toLocaleString()}`
      ).join('%0A');

      const message = `Hello FarmVora! I'd like to place an order:%0A%0AOrder Ref: ${reference}%0A%0A${itemsList}%0A%0ATotal: ₦${totalNGN.toLocaleString()}%0A%0ADelivery Address: ${encodeURIComponent(checkoutForm.delivery_address)}%0APhone: ${checkoutForm.delivery_phone}%0A${checkoutForm.delivery_notes ? `Notes: ${encodeURIComponent(checkoutForm.delivery_notes)}` : ''}`;

      const whatsappNumber = '2348000000000';
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');

      showToast('Order placed! Complete payment via WhatsApp.');
      onNavigate('dashboard');
    } catch (error) {
      console.error('Error processing order:', error);
      showToast('Failed to process order. Please try again.', 'error');
    } finally {
      setProcessingOrder(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your cart</h2>
          <button onClick={() => onNavigate('login')} className="text-green-600 hover:text-green-700 font-semibold">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  const totalNGN = cartItems.reduce((sum, item) => sum + (item.product.price_ngn * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => onNavigate('store')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-5 h-5" />
          Continue Shopping
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products from our store</p>
            <button onClick={() => onNavigate('store')} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2 space-y-3 sm:space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                  <div className="flex gap-3 sm:gap-4">
                    <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 truncate">{item.product.name}</h3>
                        <div className="text-sm sm:text-lg font-bold text-gray-900 flex-shrink-0">
                          ₦{(item.product.price_ngn * item.quantity).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                        ₦{item.product.price_ngn.toLocaleString()} / {item.product.unit}
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={updating === item.id || item.quantity <= 1} className="p-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                            <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className="font-semibold text-gray-900 w-6 sm:w-8 text-center text-sm sm:text-base">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={updating === item.id || item.quantity >= item.product.stock_quantity} className="p-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50">
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.id)} disabled={updating === item.id} className="text-red-600 hover:text-red-700 text-sm font-semibold">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 sticky top-20 space-y-4 sm:space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                <div className="space-y-3 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Total (NGN)</span>
                    <span className="font-semibold">₦{totalNGN.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Items</span>
                    <span>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <textarea
                    rows={3}
                    value={checkoutForm.delivery_address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, delivery_address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={checkoutForm.delivery_phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, delivery_phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="+234..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Notes (Optional)</label>
                  <input
                    type="text"
                    value={checkoutForm.delivery_notes}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, delivery_notes: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
                    placeholder="Any special instructions..."
                  />
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  disabled={processingOrder}
                  className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {processingOrder ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Complete Order via WhatsApp
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  You will be redirected to WhatsApp to confirm your order and arrange payment.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
