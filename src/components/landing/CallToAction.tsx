import { ArrowRight, Egg } from 'lucide-react';
import { useRouter } from '../../lib/router';

export function CallToAction() {
  const { navigate } = useRouter();

  return (
    <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-12 sm:py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Egg className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
          Affordable Eggs for Your Family
        </h2>

        <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Join thousands of Nigerian families who are getting fresh, affordable eggs delivered from
          community farms. Every purchase helps fight child malnutrition.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={() => navigate('/store')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors text-base sm:text-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/our-story')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors text-base sm:text-lg font-semibold"
          >
            Learn More
          </button>
        </div>

        <p className="text-green-100 mt-6 sm:mt-8 text-xs sm:text-sm">
          Free delivery within community zones -- Fresh from farm to your table
        </p>
      </div>
    </div>
  );
}
