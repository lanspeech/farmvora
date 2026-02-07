import { ShoppingCart, MessageCircle, Package } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">How It Works</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our waste-to-feed-to-eggs cycle keeps prices low and communities nourished
          </p>
        </div>

        <div className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">The FarmVora Cycle</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {[
              { step: 1, title: 'Collect Food Waste', desc: 'We source food waste locally that would otherwise end up in landfills', image: 'https://images.pexels.com/photos/3735218/pexels-photo-3735218.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { step: 2, title: 'Produce Feed', desc: 'We manufacture nutritious chicken feed using local ingredients and collected food waste', image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { step: 3, title: 'Farm Fresh Eggs', desc: 'Our community farms produce fresh, affordable eggs using our low-cost feed', image: 'https://images.pexels.com/photos/1300361/pexels-photo-1300361.jpeg?auto=compress&cs=tinysrgb&w=400' },
              { step: 4, title: 'Direct to Families', desc: 'Eggs are sold directly to families in the community, no middlemen, no inflated prices', image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=400' },
            ].map((item) => (
              <div key={item.step}>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full overflow-hidden">
                  <div className="h-28 sm:h-32 overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-gray-900">{item.title}</h4>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Order Online</h3>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mb-2 sm:mb-3 mx-auto">
                  1
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Browse Our Products</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Explore our range of affordable eggs and poultry products
                </p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mb-2 sm:mb-3 mx-auto">
                  2
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Order via WhatsApp</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Complete your order through WhatsApp for quick and easy checkout
                </p>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mb-2 sm:mb-3 mx-auto">
                  3
                </div>
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Fresh Delivery</h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  Receive farm-fresh eggs delivered straight to your doorstep
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
