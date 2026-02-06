import { DollarSign, Recycle, MapPin, Heart, Truck, Headphones } from 'lucide-react';

export function WhyChooseUs() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FarmVora?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are not just selling eggs -- we are building a sustainable food system that benefits families, communities, and the environment
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border border-green-100">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Truly Affordable</h3>
            <p className="text-gray-600">
              By making our own feed and selling direct, we cut out the middlemen and supply chain
              markups that make eggs expensive for ordinary families.
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl border border-amber-100">
            <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center mb-4">
              <Recycle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Waste-to-Feed Innovation</h3>
            <p className="text-gray-600">
              Our proprietary feed is made from food waste and local ingredients. This keeps costs
              low while diverting waste from landfills -- good for your wallet and the planet.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community-Based Farms</h3>
            <p className="text-gray-600">
              Our farms are located within the communities they serve, creating local jobs and
              ensuring the freshest possible eggs with minimal transport costs.
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-xl border border-red-100">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fighting Malnutrition</h3>
            <p className="text-gray-600">
              Every purchase directly contributes to making protein accessible to children and
              families who need it most. Nutrition should not be a luxury.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-white p-8 rounded-xl border border-teal-100">
            <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center mb-4">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Stable Prices</h3>
            <p className="text-gray-600">
              Because we control our feed production and supply chain, our prices remain stable
              even when market fluctuations cause prices to spike elsewhere.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200">
            <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Support</h3>
            <p className="text-gray-600">
              Our team is always available to help with orders, answer questions, and ensure
              you have the best experience with every purchase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
