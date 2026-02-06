import { useState, useRef, useEffect } from 'react';
import { Egg, LogIn, UserPlus, LogOut, User, Shield, ShoppingBag, Menu, X, ChevronDown, BookOpen, MapPin, TrendingUp, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const aboutPages = [
  { page: 'our-story', label: 'Our Story', icon: BookOpen, description: 'How FarmVora began' },
  { page: 'our-farms', label: 'Our Farms', icon: MapPin, description: 'Community farms across Nigeria' },
  { page: 'impact', label: 'Our Impact', icon: TrendingUp, description: 'Lives changed, waste recycled' },
  { page: 'contact', label: 'Contact Us', icon: MessageSquare, description: 'Get in touch' },
];

export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { user, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAboutDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setMobileAboutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSignOut = () => {
    signOut();
    setMobileMenuOpen(false);
  };

  const isAboutPage = ['our-story', 'our-farms', 'impact', 'contact'].includes(currentPage);

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

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                className={`flex items-center gap-1.5 transition-colors ${
                  isAboutPage ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'
                }`}
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 animate-in fade-in slide-in-from-top-2">
                  {aboutPages.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => navigate(item.page)}
                      className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                        currentPage === item.page ? 'bg-green-50' : ''
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        currentPage === item.page ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <item.icon className={`w-4.5 h-4.5 ${currentPage === item.page ? 'text-green-600' : 'text-gray-600'}`} />
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${currentPage === item.page ? 'text-green-600' : 'text-gray-900'}`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

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

            <div>
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-left transition-colors ${
                  isAboutPage ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  About
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileAboutOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-200 pl-4">
                  {aboutPages.map((item) => (
                    <button
                      key={item.page}
                      onClick={() => navigate(item.page)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        currentPage === item.page ? 'bg-green-50 text-green-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

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
