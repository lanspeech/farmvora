import { useState } from 'react';
import { TrendingUp, Users, Egg, Recycle, MapPin, Heart, Baby, GraduationCap, ArrowRight } from 'lucide-react';

interface ImpactPageProps {
  onNavigate: (page: string) => void;
}

const impactStats = [
  { icon: Users, value: '10,000+', label: 'Families Served', description: 'Low-income households now accessing affordable eggs' },
  { icon: Egg, value: '500,000+', label: 'Eggs Produced', description: 'Fresh eggs delivered to communities every month' },
  { icon: Recycle, value: '50 Tons', label: 'Waste Recycled', description: 'Food waste diverted from landfills into chicken feed' },
  { icon: MapPin, value: '25+', label: 'Communities', description: 'Neighborhoods served across 6 Nigerian states' },
];

const stories = [
  {
    name: 'Mama Chinwe',
    location: 'Ikorodu, Lagos',
    image: 'https://images.pexels.com/photos/3768114/pexels-photo-3768114.jpeg',
    quote: 'Before FarmVora, I could only afford eggs once a month for my four children. Now they eat eggs three times a week. I can see the difference in their energy and health.',
    impact: 'Family of 6, now consuming 24 eggs/week',
  },
  {
    name: 'Mallam Suleiman',
    location: 'Kubwa, Abuja',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    quote: 'I used to sell eggs from the big suppliers at prices my neighbors could not afford. Now I sell FarmVora eggs and my customers are happy. My sales have tripled.',
    impact: 'Local retailer, serving 200+ families weekly',
  },
  {
    name: 'Mrs. Adebayo',
    location: 'Ibadan, Oyo',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
    quote: 'As a school feeding coordinator, FarmVora eggs have been a game changer. We can now include eggs in school meals twice a week instead of once a month.',
    impact: 'Feeding 450 students at 3 schools',
  },
];

const milestones = [
  { year: '2023', title: 'The Spark', description: 'FarmVora launches pilot in Ikorodu with 500 layers and a small feed processing unit.' },
  { year: '2023', title: 'First 1,000 Families', description: 'Within 6 months, over 1,000 families gained access to affordable eggs.' },
  { year: '2024', title: 'Multi-City Expansion', description: 'Expanded to Abuja, Ibadan, and Aba with 15,000+ layers across 4 farms.' },
  { year: '2024', title: 'Waste Partnership', description: 'Signed agreements with major Lagos markets, processing 10+ tons of waste monthly.' },
  { year: '2025', title: '10,000 Families', description: 'Reached our goal of serving 10,000 families with affordable protein.' },
  { year: '2025', title: 'Kano & Port Harcourt', description: 'Opened farms in Northern Nigeria and the Niger Delta, bringing our total to 6 states.' },
];

export function ImpactPage({ onNavigate }: ImpactPageProps) {
  const [activeStory, setActiveStory] = useState(0);

  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg"
          alt="Children smiling"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-600/90 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6 tracking-wide uppercase">
              Our Impact
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 max-w-4xl leading-tight">
              Real Numbers, <span className="text-green-400">Real Lives Changed</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Every egg tells a story of a family gaining access to nutrition they could not afford before
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
                </div>
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm sm:text-base font-semibold text-green-600 mb-1 sm:mb-2">{stat.label}</p>
                <p className="text-xs text-gray-500 hidden sm:block">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">The Ripple Effect</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
              Impact Beyond Eggs
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Our waste-to-eggs model creates a chain of positive effects across communities
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img
                src="https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg"
                alt="Healthy child"
                className="w-full h-44 sm:h-48 md:h-52 object-cover"
              />
              <div className="p-5 sm:p-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <Baby className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Child Nutrition</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Children in FarmVora communities show measurable improvements in protein intake. Families report
                  better energy levels, fewer sick days, and improved school attendance.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
                alt="Community workers"
                className="w-full h-44 sm:h-48 md:h-52 object-cover"
              />
              <div className="p-5 sm:p-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Local Employment</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Each farm creates 15-20 local jobs -- from waste collectors to farm operators to delivery
                  riders. Over 120 community members now earn steady income through FarmVora.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
              <img
                src="https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg"
                alt="Waste recycling"
                className="w-full h-44 sm:h-48 md:h-52 object-cover"
              />
              <div className="p-5 sm:p-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Recycle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Environmental Impact</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  50 tons of food waste diverted from landfills every month. That is 50 tons less methane
                  emissions, less groundwater contamination, and cleaner communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Voices</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
              Stories From Our Communities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div className="relative">
              <img
                src={stories[activeStory].image}
                alt={stories[activeStory].name}
                className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4">
                <p className="font-bold text-gray-900 text-sm sm:text-base">{stories[activeStory].name}</p>
                <p className="text-xs sm:text-sm text-green-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {stories[activeStory].location}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-6 sm:mb-8">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mb-3 sm:mb-4" />
                <blockquote className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-4">
                  "{stories[activeStory].quote}"
                </blockquote>
                <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {stories[activeStory].impact}
                </div>
              </div>

              <div className="flex gap-3">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStory(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeStory ? 'bg-green-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Timeline</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Our Journey So Far
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-green-200 sm:-translate-x-0.5" />

            <div className="space-y-8 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-start gap-4 sm:gap-8 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`hidden sm:block flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? 'mr-4' : 'ml-4'}`}>
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wide">{milestone.year}</span>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="absolute left-4 sm:left-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-green-100 -translate-x-2 sm:-translate-x-2 z-10 mt-6" />

                  <div className="sm:hidden flex-1 ml-8">
                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                      <span className="text-xs font-bold text-green-600 uppercase tracking-wide">{milestone.year}</span>
                      <h3 className="text-base font-bold text-gray-900 mt-1">{milestone.title}</h3>
                      <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                    </div>
                  </div>

                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Be Part of the Impact
          </h2>
          <p className="text-base sm:text-lg text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Every purchase directly funds affordable nutrition for Nigerian families.
            Shop with purpose.
          </p>
          <button
            onClick={() => onNavigate('store')}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors text-base sm:text-lg font-semibold"
          >
            Shop FarmVora Eggs
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
