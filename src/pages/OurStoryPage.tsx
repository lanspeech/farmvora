import { Heart, Target, Eye, Users, ArrowRight, Lightbulb, Shield, Sprout } from 'lucide-react';

interface OurStoryPageProps {
  onNavigate: (page: string) => void;
}

export function OurStoryPage({ onNavigate }: OurStoryPageProps) {
  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg"
          alt="Nigerian farmland"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-green-600/90 text-white text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6 tracking-wide uppercase">
              Our Story
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 max-w-4xl leading-tight">
              From Food Waste to <span className="text-green-400">Nourished Families</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
              The story of how one idea is changing the way Nigerian communities access affordable protein
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">The Beginning</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6">
                A Problem Too Big to Ignore
              </h2>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Nigeria faces one of the worst child malnutrition crises in the world. According to UNICEF,
                  over 12 million Nigerian children under five suffer from stunting, while nearly 3 million face
                  severe acute malnutrition every year.
                </p>
                <p>
                  The root cause is painfully simple: families cannot afford enough protein. Eggs -- once the most
                  accessible source of complete protein -- have become a luxury. Middlemen, volatile feed costs, and
                  broken supply chains have pushed prices beyond what low-income households can bear.
                </p>
                <p>
                  FarmVora was born from a refusal to accept this reality. We saw mountains of food waste going to
                  landfills while children went hungry, and we asked: what if we could connect those two problems
                  into one solution?
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg"
                alt="Children in a Nigerian community"
                className="rounded-2xl shadow-xl w-full h-64 sm:h-80 md:h-96 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-green-600 text-white p-4 sm:p-6 rounded-xl shadow-lg">
                <p className="text-2xl sm:text-3xl font-bold">12M+</p>
                <p className="text-xs sm:text-sm text-green-100">Malnourished children in Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg"
                alt="Sustainable farming practices"
                className="rounded-2xl shadow-xl w-full h-64 sm:h-80 md:h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">The Solution</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 sm:mb-6">
                Waste In, Eggs Out
              </h2>
              <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
                <p>
                  Our model is elegantly simple. We collect food waste from markets, restaurants, and food
                  processors across Nigerian cities. This waste -- which would otherwise rot in landfills -- is
                  processed into high-quality chicken feed at a fraction of the cost of commercial feed.
                </p>
                <p>
                  That affordable feed powers community egg farms, where local operators produce fresh eggs
                  right where families live. No long supply chains. No middlemen inflating prices. No
                  compromises on quality.
                </p>
                <p>
                  The result? Eggs that cost families significantly less, while creating local jobs and
                  reducing environmental waste. It is circular economics at its most human.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Our Values</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make, from farm operations to community partnerships
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Heart,
                title: 'Community First',
                description: 'Every decision we make starts with the families we serve. Their needs are our compass.',
                color: 'red',
              },
              {
                icon: Sprout,
                title: 'Sustainability',
                description: 'We prove that environmental responsibility and affordability can work hand in hand.',
                color: 'green',
              },
              {
                icon: Shield,
                title: 'Quality & Safety',
                description: 'Our eggs meet rigorous health standards. Affordable does not mean compromised.',
                color: 'blue',
              },
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'We constantly improve our feed formulas and farming methods to drive costs down further.',
                color: 'amber',
              },
            ].map((value, index) => {
              const bgColors: Record<string, string> = { red: 'bg-red-100', green: 'bg-green-100', blue: 'bg-blue-100', amber: 'bg-amber-100' };
              const textColors: Record<string, string> = { red: 'text-red-600', green: 'text-green-600', blue: 'text-blue-600', amber: 'text-amber-600' };
              return (
                <div key={index} className="text-center p-5 sm:p-6 md:p-8 rounded-xl bg-gray-50 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 ${bgColors[value.color]} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`w-7 h-7 sm:w-8 sm:h-8 ${textColors[value.color]}`} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Vision & Mission</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Where We Are Headed
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Eye className="w-6 h-6 sm:w-7 sm:h-7 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Vision</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                A Nigeria where no child goes without protein. Where every family -- regardless of income --
                can afford the nutrition their children need to grow, learn, and thrive. We envision a network
                of community egg farms across all 36 states, turning waste into nourishment at scale.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To produce and deliver the most affordable eggs in Nigeria through sustainable, waste-based
                feed production and community-level farming. We exist to close the protein gap for low-income
                families, one egg at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">Leadership</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3 sm:mb-4">
              The People Behind FarmVora
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              A passionate team of agricultural innovators, community builders, and nutrition advocates
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: 'Adaeze Okonkwo',
                role: 'Founder & CEO',
                image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
                bio: 'Agricultural engineer with 10+ years in sustainable food systems across West Africa.',
              },
              {
                name: 'Chukwuma Eze',
                role: 'Head of Operations',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                bio: 'Former logistics director who scaled supply chains for FMCG companies across Nigeria.',
              },
              {
                name: 'Folake Adeyemi',
                role: 'Community Director',
                image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
                bio: 'Community development specialist who has worked with NGOs on nutrition programs in 15 states.',
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg sm:text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-green-300 text-sm font-semibold">{member.role}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed px-1">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-10 h-10 sm:w-12 sm:h-12 text-green-200 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Join the Movement
          </h2>
          <p className="text-base sm:text-lg text-green-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Every egg you buy from FarmVora helps a family access affordable nutrition. Be part of the change.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => onNavigate('store')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-green-700 rounded-lg hover:bg-green-50 transition-colors text-base sm:text-lg font-semibold flex items-center justify-center gap-2"
            >
              Shop Now
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors text-base sm:text-lg font-semibold"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
