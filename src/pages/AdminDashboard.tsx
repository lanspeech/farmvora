import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import {
  Users, BarChart3, Search,
  ShoppingBag, Package
} from 'lucide-react';
import { ProductManagement } from '../components/admin/ProductManagement';
import { OrderManagement } from '../components/admin/OrderManagement';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  country: string | null;
  created_at: string;
  is_suspended: boolean;
  suspended_reason: string | null;
  last_login: string | null;
}

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'products' | 'orders'>('overview');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [orderCount, setOrderCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [showEditUser, setShowEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');
  const [productCount, setProductCount] = useState(0);

  const [userEditForm, setUserEditForm] = useState({
    full_name: '',
    country: '',
    role: '',
  });

  useEffect(() => {
    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      loadAllData();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    try {
      const { data, error } = await supabase.rpc('is_admin');
      if (error) throw error;
      setIsAdmin(data);
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const loadAllData = async () => {
    await Promise.all([
      loadUsers(),
      loadOrderStats(),
      loadProductCount(),
    ]);
  };

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadOrderStats = async () => {
    try {
      const { data: orders, error } = await supabase
        .from('orders')
        .select('id, total_amount');

      if (error) throw error;

      setOrderCount(orders?.length || 0);
      setTotalRevenue(orders?.reduce((sum, o) => sum + (o.total_amount || 0), 0) || 0);
    } catch (error) {
      console.error('Error loading order stats:', error);
    }
  };

  const loadProductCount = async () => {
    try {
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (error) throw error;
      setProductCount(count || 0);
    } catch (error) {
      console.error('Error loading product count:', error);
    }
  };

  const handleSuspendUser = async (userId: string) => {
    const suspendReason = prompt('Please enter reason for suspension:');
    if (!suspendReason) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_suspended: true, suspended_reason: suspendReason })
        .eq('id', userId);

      if (error) throw error;
      alert('User suspended successfully');
      loadUsers();
    } catch (error) {
      console.error('Error suspending user:', error);
      alert('Failed to suspend user');
    }
  };

  const handleUnsuspendUser = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ is_suspended: false, suspended_reason: null })
        .eq('id', userId);

      if (error) throw error;
      alert('User unsuspended successfully');
      loadUsers();
    } catch (error) {
      console.error('Error unsuspending user:', error);
      alert('Failed to unsuspend user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    const confirmText = prompt('Type "DELETE" to confirm:');
    if (confirmText !== 'DELETE') { alert('Deletion cancelled'); return; }

    try {
      const { error } = await supabase.from('profiles').delete().eq('id', userId);
      if (error) throw error;
      alert('User deleted successfully');
      loadUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
    }
  };

  const handleEditUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: userEditForm.full_name,
          country: userEditForm.country,
          role: userEditForm.role,
        })
        .eq('id', selectedUser.id);

      if (error) throw error;
      alert('User updated successfully');
      setShowEditUser(false);
      setSelectedUser(null);
      loadUsers();
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const openEditUser = (userItem: UserProfile) => {
    setSelectedUser(userItem);
    setUserEditForm({
      full_name: userItem.full_name,
      country: userItem.country || '',
      role: userItem.role,
    });
    setShowEditUser(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }

  const activeUsers = users.filter(u => !u.is_suspended).length;
  const suspendedUsers = users.filter(u => u.is_suspended).length;

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' ||
                         (statusFilter === 'active' && !u.is_suspended) ||
                         (statusFilter === 'suspended' && u.is_suspended);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">FarmVora Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your store, products, and customers</p>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Customers</h3>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{users.length}</p>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">{activeUsers} active, {suspendedUsers} suspended</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Orders</h3>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{orderCount}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Revenue</h3>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">₦{totalRevenue.toLocaleString()}</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Products</h3>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{productCount}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 sm:space-x-8 px-4 sm:px-6 overflow-x-auto" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'overview'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'users'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Customers ({users.length})
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'products'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Store Products
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'orders'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Orders ({orderCount})
              </button>
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === 'products' && <ProductManagement />}
            {activeTab === 'orders' && <OrderManagement />}

            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Customers</h2>
                {users.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No customers yet.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {users.slice(0, 10).map((userProfile) => (
                          <tr key={userProfile.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{userProfile.full_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{userProfile.email}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{userProfile.country || '-'}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(userProfile.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Management</h2>
                  <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <div className="relative">
                      <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'suspended')}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="all">All Customers</option>
                      <option value="active">Active Only</option>
                      <option value="suspended">Suspended Only</option>
                    </select>
                  </div>
                </div>
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No customers found.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredUsers.map((userProfile) => (
                          <tr key={userProfile.id} className={`hover:bg-gray-50 ${userProfile.is_suspended ? 'bg-red-50' : ''}`}>
                            <td className="px-6 py-4 font-medium text-gray-900">{userProfile.full_name}</td>
                            <td className="px-6 py-4 text-sm text-gray-600">{userProfile.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                userProfile.role === 'admin'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}>
                                {userProfile.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">{userProfile.country || '-'}</td>
                            <td className="px-6 py-4">
                              {userProfile.is_suspended ? (
                                <div>
                                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">
                                    Suspended
                                  </span>
                                  {userProfile.suspended_reason && (
                                    <p className="text-xs text-gray-500 mt-1">{userProfile.suspended_reason}</p>
                                  )}
                                </div>
                              ) : (
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                  Active
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {new Date(userProfile.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openEditUser(userProfile)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                                >
                                  Edit
                                </button>
                                {userProfile.is_suspended ? (
                                  <button
                                    onClick={() => handleUnsuspendUser(userProfile.id)}
                                    className="text-green-600 hover:text-green-700 text-sm font-semibold"
                                  >
                                    Unsuspend
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => handleSuspendUser(userProfile.id)}
                                    className="text-orange-600 hover:text-orange-700 text-sm font-semibold"
                                  >
                                    Suspend
                                  </button>
                                )}
                                {userProfile.role !== 'admin' && (
                                  <button
                                    onClick={() => handleDeleteUser(userProfile.id)}
                                    className="text-red-600 hover:text-red-700 text-sm font-semibold"
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {showEditUser && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Customer</h2>
            <form onSubmit={handleEditUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={userEditForm.full_name}
                  onChange={(e) => setUserEditForm({ ...userEditForm, full_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={userEditForm.country}
                  onChange={(e) => setUserEditForm({ ...userEditForm, country: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={userEditForm.role}
                  onChange={(e) => setUserEditForm({ ...userEditForm, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Email:</span> {selectedUser.email}
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditUser(false); setSelectedUser(null); }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
