import { MapPin, Egg, Recycle, Sun, Droplets, Users, ChevronRight, Leaf } from 'lucide-react';

interface OurFarmsPageProps {
  onNavigate: (page: string) => void;
}

const farms = [
  {
    name: 'Ikorodu Community Farm',
    location: 'Ikorodu, Lagos',
    image: 'https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg',
    capacity: '5,000 layers',
    families: '2,000+',
    description: 'Our flagship farm in Lagos, serving families across Ikorodu, Agbowa, and surrounding communities with daily fresh eggs.',
  },
  {
    name: 'Kubwa Green Farm',
    location: 'Kubwa, Abuja',
    image: 'https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg',
    capacity: '3,500 layers',
    families: '1,500+',
    description: 'Strategically located to serve Abuja\'s growing suburbs, this farm processes food waste from Kubwa market into premium feed.',
  },
  {
    name: 'Aba Sustainable Farm',
    location: 'Aba, Abia State',
    image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
    capacity: '4,000 layers',
    families: '1,800+',
    description: 'Our Southeast hub, partnering with Aba\'s vibrant markets to source food waste and provide affordable protein to families.',
  },
  {
    name: 'Kano Community Farm',
    location: 'Kano, Kano State',
    image: 'https://images.pexels.com/photos/1300361/pexels-photo-1300361.jpeg',
    capacity: '3,000 layers',
    families: '1,200+',
    description: 'Bringing affordable eggs to Northern Nigeria, this farm works with local waste collectors and community cooperatives.',
  },
  {
    name: 'Ibadan Farm Hub',
    location: 'Ibadan, Oyo State',
    image: 'https://images.pexels.com/photos/2518861/pexels-photo-2518861.jpeg',
    capacity: '4,500 layers',
    families: '2,200+',
    description: 'Our largest farm by area, utilizing the agricultural expertise of Oyo State to produce eggs at optimal efficiency.',
  },
  {
    name: 'Port Harcourt Farm',
    location: 'Port Harcourt, Rivers',
    image: 'https://images.pexels.com/photos/2382325/pexels-photo-2382325.jpeg',
    capacity: '2,800 layers',
    families: '1,000+',
    description: 'Serving the Niger Delta region, this farm demonstrates how waste recycling and poultry can transform communities.',
  },
];

const farmFeatures = [
  {
    icon: Recycle,
    title: 'Waste-to-Feed Processing',
    description: 'Every farm has an on-site feed processing unit that converts locally sourced food waste into nutrient-rich chicken feed.',
    image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg',
  },
  {
    icon: Sun,
    title: 'Solar-Powered Operations',
    description: 'Our farms use solar panels to reduce energy costs and ensure consistent operations even during power outages.',
    image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
  },
  {
    icon: Droplets,
    title: 'Water Recycling Systems',
    description: 'Closed-loop water systems minimize waste and ensure clean water supply for the birds at all times.',
    image: 'https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg',
  },
];

export function OurFarmsPage({ onNavigate }: OurFarmsPageProps) {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2382665/pexels-photo-2382665.jpeg"
          alt="Farm landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-600/90 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6 tracking-wide uppercase">
              Our Farms
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 max-w-4xl leading-tight">
              Community Farms Across <span className="text-green-400">Nigeria</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Sustainable egg production facilities embedded in the communities they serve
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Farm Network</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
              Where Fresh Eggs Come From
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Each farm is strategically located within communities, reducing transport costs and ensuring
              eggs arrive fresh at your doorstep
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {farms.map((farm, index) => (
              <div key={index} className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
                  <img
                    src={farm.image}
                    alt={farm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-semibold text-gray-700">{farm.location}</span>
                  </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{farm.name}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">{farm.description}</p>
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Egg className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-gray-700">{farm.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-gray-700">{farm.families} families</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Farm Technology</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
              Built for Sustainability
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Our farms combine traditional farming knowledge with modern sustainable technology
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {farmFeatures.map((feature, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:[direction:rtl]' : ''}`}>
                <div className={index % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                <div className={index % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-2xl shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-green-50 to-amber-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
              <div>
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 mb-4" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Want a FarmVora Farm in Your Community?
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  We are expanding to new communities across Nigeria. If your area needs affordable
                  protein access, we want to hear from you. Community leaders, cooperatives, and local
                  government partners are welcome.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  Contact Us
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div>
                <img
                  src="https://images.pexels.com/photos/2265247/pexels-photo-2265247.jpeg"
                  alt="Community farming"
                  className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl sm:rounded-2xl shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
