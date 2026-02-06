import { Egg, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Egg className="w-8 h-8 text-green-500" />
              <span className="text-xl font-bold">FarmVora</span>
            </div>
            <p className="text-gray-400 text-sm">
              Affordable eggs from community farms. Fighting malnutrition through sustainable,
              waste-to-feed-to-eggs production.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => handleNav('store')} className="hover:text-white transition-colors">
                  Our Store
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('our-story')} className="hover:text-white transition-colors">
                  Our Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('our-farms')} className="hover:text-white transition-colors">
                  Our Farms
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('impact')} className="hover:text-white transition-colors">
                  Our Impact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Bulk Orders
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
                  Partnerships
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@farmvora.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 FarmVora. All rights reserved. Nourishing Nigerian communities through sustainable egg production.</p>
        </div>
      </div>
    </footer>
  );
}
