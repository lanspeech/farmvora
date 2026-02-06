import { Users, Egg, Recycle, MapPin } from 'lucide-react';

export function Stats() {
  return (
    <div className="bg-gradient-to-br from-green-600 to-green-700 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Our Impact</h2>
          <p className="text-lg sm:text-xl text-green-100">
            Nourishing communities, one egg at a time
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/20">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">10,000+</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Families Served</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/20">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Egg className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">500K+</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Eggs Produced</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/20">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Recycle className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">50 Tons</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Waste Recycled Into Feed</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl border border-white/20">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">25+</div>
              <div className="text-xs sm:text-sm md:text-base text-green-100">Communities Reached</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
