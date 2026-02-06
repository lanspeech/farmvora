import { useState } from 'react';
import { Egg, LogIn, UserPlus, LogOut, User, Shield, ShoppingBag, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { user, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  const linkClass = (page: string) =>
    `flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors ${
      currentPage === page ? 'text-green-600 font-semibold' : ''
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 text-xl font-bold text-green-600 hover:text-green-700 transition-colors"
          >
            <Egg className="w-8 h-8" />
            FarmVora
          </button>

          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('store')} className={linkClass('store')}>
              <ShoppingBag className="w-4 h-4" />
              Store
            </button>

            {user ? (
              <>
                {isAdmin && (
                  <button onClick={() => navigate('admin')} className={linkClass('admin')}>
                    <Shield className="w-4 h-4" />
                    Admin
                  </button>
                )}
                <button onClick={() => navigate('profile')} className={linkClass('profile')}>
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('login')}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
                <button
                  onClick={() => navigate('signup')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-green-600 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            <button
              onClick={() => navigate('store')}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                currentPage === 'store' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Store
            </button>

            {user ? (
              <>
                {isAdmin && (
                  <button
                    onClick={() => navigate('admin')}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                      currentPage === 'admin' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Shield className="w-5 h-5" />
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={() => navigate('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    currentPage === 'profile' ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('login')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
                <button
                  onClick={() => navigate('signup')}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left bg-green-600 text-white hover:bg-green-700 transition-colors font-semibold"
                >
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
