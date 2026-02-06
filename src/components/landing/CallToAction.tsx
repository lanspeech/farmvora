import { ArrowRight, Egg } from 'lucide-react';

interface CallToActionProps {
  onGetStarted: () => void;
}

export function CallToAction({ onGetStarted }: CallToActionProps) {
  return (
    <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <Egg className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Affordable Eggs for Your Family
        </h2>

        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Join thousands of Nigerian families who are getting fresh, affordable eggs delivered from
          community farms. Every purchase helps fight child malnutrition.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors text-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            Shop Now
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={onGetStarted}
            className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors text-lg font-semibold"
          >
            Learn More
          </button>
        </div>

        <p className="text-green-100 mt-8 text-sm">
          Free delivery within community zones -- Fresh from farm to your table
        </p>
      </div>
    </div>
  );
}
