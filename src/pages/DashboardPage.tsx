import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../lib/router';
import { Package, Clock, ChevronDown, ChevronUp, MapPin, Phone, ShoppingBag, User, Mail, Globe, Calendar } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  unit_price_ngn: number;
  subtotal_ngn: number;
  product: {
    name: string;
    image_url: string;
    unit: string;
  };
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  payment_status: string;
  payment_reference: string;
  total_amount_ngn: number;
  delivery_address: string;
  delivery_phone: string;
  delivery_notes: string | null;
  order_items: OrderItem[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-cyan-100 text-cyan-700',
  shipped: 'bg-teal-100 text-teal-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const statusSteps = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export function DashboardPage() {
  const { navigate } = useRouter();
  const { user, profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const loadOrders = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id, created_at, status, payment_status, payment_reference,
          total_amount_ngn, delivery_address, delivery_phone, delivery_notes,
          order_items(id, quantity, unit_price_ngn, subtotal_ngn, product:product_id(name, image_url, unit))
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status: string) => statusSteps.indexOf(status);

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in to view your dashboard</h2>
          <button onClick={() => navigate('/login')} className="text-green-600 hover:text-green-700 font-semibold">
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
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">My Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Track your orders and manage your account</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="h-20 bg-gradient-to-r from-green-400 to-green-600" />
              <div className="px-5 pb-5">
                <div className="w-16 h-16 bg-white rounded-full border-4 border-white shadow flex items-center justify-center -mt-8 mb-3">
                  <User className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">{profile.full_name}</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 mb-4">
                  {profile.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  {profile.country && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span>{profile.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/store')}
              className="w-full mt-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Browse Store
            </button>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order History</h2>
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No orders yet</h3>
                <p className="text-gray-600 mb-4">Your order history will appear here once you place an order.</p>
                <button onClick={() => navigate('/store')} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => {
                  const isExpanded = expandedOrder === order.id;
                  const currentStep = getStepIndex(order.status);
                  const isCancelled = order.status === 'cancelled';

                  return (
                    <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                        className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="font-semibold text-gray-900 text-sm">
                              {order.payment_reference}
                            </span>
                            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="font-semibold text-gray-900">
                              ₦{order.total_amount_ngn.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                      </button>

                      {isExpanded && (
                        <div className="border-t border-gray-200 p-4 sm:p-5 space-y-5">
                          {!isCancelled && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-3">Order Progress</h4>
                              <div className="flex items-center gap-1">
                                {statusSteps.map((step, i) => (
                                  <div key={step} className="flex-1 flex flex-col items-center">
                                    <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                      i <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-400'
                                    }`}>
                                      {i + 1}
                                    </div>
                                    <span className={`text-[10px] sm:text-xs mt-1 capitalize ${i <= currentStep ? 'text-green-700 font-medium' : 'text-gray-400'}`}>
                                      {step}
                                    </span>
                                    {i < statusSteps.length - 1 && (
                                      <div className={`h-0.5 w-full mt-1 ${i < currentStep ? 'bg-green-600' : 'bg-gray-200'}`} />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Items</h4>
                            <div className="space-y-2">
                              {order.order_items.map(item => (
                                <div key={item.id} className="flex items-center gap-3">
                                  <img
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    className="w-10 h-10 rounded object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                                    <p className="text-xs text-gray-500">{item.quantity} x ₦{item.unit_price_ngn.toLocaleString()}</p>
                                  </div>
                                  <span className="text-sm font-semibold text-gray-900">
                                    ₦{item.subtotal_ngn.toLocaleString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-start gap-2 text-gray-600">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{order.delivery_address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone className="w-4 h-4 flex-shrink-0" />
                              <span>{order.delivery_phone}</span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <span className="text-sm text-gray-600">Payment: <span className="font-medium capitalize">{order.payment_status.replace('_', ' ')}</span></span>
                            <span className="text-lg font-bold text-gray-900">₦{order.total_amount_ngn.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
