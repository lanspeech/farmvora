import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useToast } from '../Toast';
import { Search, ChevronDown, ChevronUp, MapPin, Phone, Clock } from 'lucide-react';

interface OrderItem {
  id: string;
  quantity: number;
  unit_price_ngn: number;
  subtotal_ngn: number;
  product: {
    name: string;
    image_url: string;
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
  user: {
    full_name: string;
    email: string;
  };
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

const statusOptions = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

export function OrderManagement() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          id, created_at, status, payment_status, payment_reference,
          total_amount_ngn, delivery_address, delivery_phone, delivery_notes,
          user:user_id(full_name, email),
          order_items(id, quantity, unit_price_ngn, subtotal_ngn, product:product_id(name, image_url))
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId);
    try {
      const updateData: Record<string, string> = { status: newStatus };
      if (newStatus === 'confirmed' || newStatus === 'delivered') {
        updateData.payment_status = newStatus === 'delivered' ? 'completed' : 'confirmed';
      }

      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);

      if (error) throw error;
      showToast(`Order updated to ${newStatus}`);
      loadOrders();
    } catch {
      showToast('Failed to update order', 'error');
    } finally {
      setUpdating(null);
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      o.payment_reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Order Management</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
          >
            <option value="all">All Statuses</option>
            {statusOptions.map(s => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => {
            const isExpanded = expandedOrder === order.id;
            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  className="w-full p-4 flex items-center justify-between gap-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{order.payment_reference}</span>
                      <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-500">
                      <span>{order.user.full_name}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="font-semibold text-gray-900">₦{order.total_amount_ngn.toLocaleString()}</span>
                    </div>
                  </div>
                  {isExpanded ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500 mb-1">Customer</p>
                        <p className="font-medium text-gray-900">{order.user.full_name}</p>
                        <p className="text-gray-600 text-xs">{order.user.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 mb-1">Update Status</p>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          disabled={updating === order.id}
                          className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm disabled:opacity-50"
                        >
                          {statusOptions.map(s => (
                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-2">Items</p>
                      <div className="space-y-2">
                        {order.order_items.map(item => (
                          <div key={item.id} className="flex items-center gap-3">
                            <img src={item.product.image_url} alt={item.product.name} className="w-10 h-10 rounded object-cover" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">₦{item.subtotal_ngn.toLocaleString()}</span>
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

                    {order.delivery_notes && (
                      <p className="text-sm text-gray-500">Notes: {order.delivery_notes}</p>
                    )}

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
  );
}
