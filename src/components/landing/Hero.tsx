import { Egg, AlertTriangle, Recycle, Heart, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onVisitStore: () => void;
}

export function Hero({ onGetStarted, onVisitStore }: HeroProps) {
  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-10 sm:mb-16">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Egg className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Affordable Protein for{' '}
            <span className="text-green-600">Every Nigerian Family</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            We turn food waste into chicken feed, and chicken feed into affordable eggs -- delivering
            reliable protein directly to communities that need it most, without the middlemen driving up prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={onVisitStore}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-base sm:text-lg font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Shop Affordable Eggs
            </button>
            <button
              onClick={onGetStarted}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-600 border-2 border-green-600 rounded-lg hover:bg-green-50 transition-all text-base sm:text-lg font-semibold"
            >
              Learn How It Works
            </button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-10 sm:mt-16 md:mt-20">
          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">The Crisis</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Over 12 million Nigerian children are malnourished. Rising food prices have turned eggs -- once the cheapest protein source -- into a luxury for low-income families.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Recycle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Our Solution</h3>
            <p className="text-sm sm:text-base text-gray-600">
              We manufacture chicken feed from locally sourced food waste, produce affordable eggs within communities, and sell directly to families -- cutting out the middlemen.
            </p>
          </div>

          <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">The Impact</h3>
            <p className="text-sm sm:text-base text-gray-600">
              Every egg sold means a child gets affordable protein, a family faces less food stress, and waste that would fill landfills instead feeds communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
