import { Trash2, Factory, Egg, Home, ShoppingCart, CreditCard, Package } from 'lucide-react';

export function HowItWorks() {
  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our waste-to-feed-to-eggs cycle keeps prices low and communities nourished
          </p>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">The FarmVora Cycle</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Trash2 className="w-6 h-6 text-amber-600" />
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                    1
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Collect Food Waste</h4>
                  <p className="text-gray-600 text-sm">
                    We source food waste locally that would otherwise end up in landfills
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200" />
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Factory className="w-6 h-6 text-green-600" />
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                    2
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Produce Feed</h4>
                  <p className="text-gray-600 text-sm">
                    We manufacture nutritious chicken feed using local ingredients and collected food waste
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200" />
            </div>

            <div className="relative">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Egg className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                    3
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Farm Fresh Eggs</h4>
                  <p className="text-gray-600 text-sm">
                    Our community farms produce fresh, affordable eggs using our low-cost feed
                  </p>
                </div>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-green-200" />
            </div>

            <div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                    4
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Direct to Families</h4>
                  <p className="text-gray-600 text-sm">
                    Eggs are sold directly to families in the community, no middlemen, no inflated prices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order Online</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                  1
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Browse Our Products</h4>
                <p className="text-gray-600 text-sm">
                  Explore our range of affordable eggs and poultry products
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <CreditCard className="w-6 h-6 text-amber-600" />
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                  2
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Place Your Order</h4>
                <p className="text-gray-600 text-sm">
                  Add to cart and checkout securely with multiple payment options
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mb-3 mx-auto">
                  3
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Fresh Delivery</h4>
                <p className="text-gray-600 text-sm">
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
