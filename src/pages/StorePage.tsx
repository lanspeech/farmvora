import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { useRouter } from '../lib/router';
import { ShoppingCart, Search, Filter, Plus, Eye } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price_usd: number;
  price_ngn: number;
  unit: string;
  stock_quantity: number;
  image_url: string;
  is_available: boolean;
}

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product: Product;
}

const categoryNames: Record<string, string> = {
  all: 'All Products',
  eggs: 'Eggs',
  live_chicken: 'Live Chickens',
  frozen_chicken: 'Frozen Chicken',
  frozen_parts: 'Chicken Parts',
  frozen_turkey: 'Turkey',
  frozen_duck: 'Duck',
};

export function StorePage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { navigate } = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
    if (user) loadCart();
  }, [user]);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_available', true)
        .order('name');
      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

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
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) {
      showToast('Please sign in to add items to cart', 'warning');
      return;
    }
    setAddingToCart(product.id);
    try {
      const existingItem = cartItems.find(item => item.product_id === product.id);
      if (existingItem) {
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cart_items')
          .insert({ user_id: user.id, product_id: product.id, quantity: 1 });
        if (error) throw error;
      }
      showToast(`${product.name} added to cart`);
      loadCart();
    } catch {
      showToast('Failed to add to cart', 'error');
    } finally {
      setAddingToCart(null);
    }
  };

  const isInCart = (productId: string) => cartItems.some(item => item.product_id === productId);

  const handleViewCart = () => {
    navigate('/cart');
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading store...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">FarmVora Store</h1>
            <p className="text-sm sm:text-base text-gray-600">Affordable eggs and poultry, straight from our community farms</p>
          </div>
          {user && (
            <button
              onClick={handleViewCart}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold relative"
            >
              <ShoppingCart className="w-5 h-5" />
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {categoryNames[cat] || cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredProducts.length} products
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-32 sm:h-40 md:h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image_url || 'https://images.pexels.com/photos/1300361/pexels-photo-1300361.jpeg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
                    <div className="flex items-baseline gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                        ₦{product.price_ngn.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500">/ {product.unit}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="text-xs sm:text-sm text-gray-600">
                        Stock: {product.stock_quantity} {product.unit}s
                      </span>
                      {product.stock_quantity < 10 && (
                        <span className="text-xs text-red-600 font-semibold">Low stock!</span>
                      )}
                    </div>
                    {isInCart(product.id) ? (
                      <button
                        onClick={handleViewCart}
                        className="w-full py-2 px-3 sm:px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm"
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        View Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        disabled={addingToCart === product.id || product.stock_quantity === 0}
                        className="w-full py-2 px-3 sm:px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm"
                      >
                        {addingToCart === product.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Adding...
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
