import { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
  onVisitStore: () => void;
}

const slides = [
  {
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Affordable Protein for Every Nigerian Family',
    subtitle: 'We turn food waste into chicken feed, and chicken feed into affordable eggs -- delivering reliable protein directly to communities that need it most.',
  },
  {
    image: 'https://images.pexels.com/photos/1300361/pexels-photo-1300361.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Farm-Fresh Eggs, Straight to Your Door',
    subtitle: 'Order fresh eggs from our community farms and get them delivered to your doorstep. No middlemen, no inflated prices.',
  },
  {
    image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Sustainable Farming, Healthier Communities',
    subtitle: 'Our waste-to-feed innovation keeps costs low while diverting waste from landfills -- good for your wallet and the planet.',
  },
  {
    image: 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg?auto=compress&cs=tinysrgb&w=1920',
    title: 'Community Farms Across Nigeria',
    subtitle: 'With farms in Lagos, Abuja, Kano, and more -- we are building a sustainable food system that benefits families everywhere.',
  },
];

export function Hero({ onGetStarted, onVisitStore }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative h-[600px] sm:h-[650px] md:h-[700px] lg:h-[750px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
      ))}

      <div className="relative z-20 h-full flex flex-col justify-end pb-20 sm:pb-24 md:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  i === current
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
                style={{ position: i === current ? 'relative' : 'absolute' }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed max-w-2xl">
                  {slide.subtitle}
                </p>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={onVisitStore}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Affordable Eggs
              </button>
              <button
                onClick={onGetStarted}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-lg hover:bg-white/20 transition-all text-base sm:text-lg font-semibold"
              >
                Learn How It Works
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2.5 bg-green-500'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
