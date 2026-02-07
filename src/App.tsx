import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastProvider } from './components/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/landing/Hero';
import { FeaturedProducts } from './components/landing/FeaturedProducts';
import { AboutUs } from './components/landing/AboutUs';
import { HowItWorks } from './components/landing/HowItWorks';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { Stats } from './components/landing/Stats';
import { CallToAction } from './components/landing/CallToAction';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { AdminDashboard } from './pages/AdminDashboard';
import { DashboardPage } from './pages/DashboardPage';
import { StorePage } from './pages/StorePage';
import { CartPage } from './pages/CartPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { OurFarmsPage } from './pages/OurFarmsPage';
import { ImpactPage } from './pages/ImpactPage';
import { ContactPage } from './pages/ContactPage';

function AppContent() {
  const { user, isAdmin, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              onGetStarted={() => handleNavigate('store')}
              onVisitStore={() => handleNavigate('store')}
            />
            <FeaturedProducts onVisitStore={() => handleNavigate('store')} />
            <Stats />
            <WhyChooseUs />
            <HowItWorks />
            <AboutUs />
            <CallToAction onGetStarted={() => handleNavigate('store')} />
          </>
        )}

        {currentPage === 'store' && (
          <StorePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'dashboard' && user && (
          <DashboardPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'our-story' && (
          <OurStoryPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'our-farms' && (
          <OurFarmsPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'impact' && (
          <ImpactPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'login' && (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Welcome Back</h2>
              <LoginForm
                onToggleForm={() => handleNavigate('signup')}
                onSuccess={() => handleNavigate('dashboard')}
              />
            </div>
          </div>
        )}

        {currentPage === 'signup' && (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 sm:py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Create Account</h2>
              <SignupForm
                onToggleForm={() => handleNavigate('login')}
                onSuccess={() => handleNavigate('dashboard')}
              />
            </div>
          </div>
        )}

        {currentPage === 'admin' && user && isAdmin && (
          <AdminDashboard />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
