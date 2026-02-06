import { Egg, AlertTriangle, Recycle, Heart, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onVisitStore: () => void;
}

export function Hero({ onGetStarted, onVisitStore }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Egg className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Affordable Protein for{' '}
            <span className="text-green-600">Every Nigerian Family</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We turn food waste into chicken feed, and chicken feed into affordable eggs -- delivering
            reliable protein directly to communities that need it most, without the middlemen driving up prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onVisitStore}
              className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Affordable Eggs
            </button>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all text-lg font-semibold"
            >
              Learn How It Works
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">The Crisis</h3>
            <p className="text-gray-600">
              Over 12 million Nigerian children are malnourished. Rising food prices have turned eggs -- once the cheapest protein source -- into a luxury for low-income families.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Recycle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Solution</h3>
            <p className="text-gray-600">
              We manufacture chicken feed from locally sourced food waste, produce affordable eggs within communities, and sell directly to families -- cutting out the middlemen.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">The Impact</h3>
            <p className="text-gray-600">
              Every egg sold means a child gets affordable protein, a family faces less food stress, and waste that would fill landfills instead feeds communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
