import { Users, Target, Award, Heart } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About FarmVora</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tackling child malnutrition in Nigeria through community-driven, sustainable egg production.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-600 mb-4">
              In Nigeria, over 12 million children are malnourished, and 4 in every 5 children under five
              suffer from stunted growth or other forms of undernutrition. Rising food prices driven by economic
              instability have made basic meals unaffordable for many families.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              FarmVora was designed to tackle this crisis in a practical, community-driven manner. Our core product
              is affordable eggs produced within local communities and sold directly to families, removing the
              extra layers that drive up prices.
            </p>
            <p className="text-lg text-gray-600">
              What truly sets us apart is how we make these eggs. We manufacture our own chicken feed using locally
              available ingredients and food waste that would otherwise end up in landfills. This waste-to-feed-to-eggs
              cycle lowers costs, stabilises prices, and delivers affordable protein to families nationwide.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-amber-50 rounded-2xl p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Nourishing Communities</h4>
              <p className="text-gray-700">
                Turning everyday waste into healthier outcomes for entire communities
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600">
              A Nigeria where no child goes without adequate protein. We envision affordable,
              locally produced eggs in every community across the nation.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community-Driven</h3>
            <p className="text-gray-600">
              Our farms operate within the communities they serve, creating local jobs, reducing
              transport costs, and ensuring families get the freshest eggs at the lowest prices.
            </p>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability First</h3>
            <p className="text-gray-600">
              By converting food waste into feed, we reduce landfill waste while producing nutritious
              eggs. Every purchase supports a cleaner environment and healthier families.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
