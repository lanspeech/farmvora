import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Egg, ArrowRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price_usd: number;
  price_ngn: number;
  unit: string;
  image_url: string;
}

interface FeaturedProductsProps {
  onVisitStore: () => void;
}

export function FeaturedProducts({ onVisitStore }: FeaturedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, description, price_usd, price_ngn, unit, image_url')
        .eq('is_available', true)
        .limit(4);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || products.length === 0) return null;

  return (
    <div className="bg-white py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-3 sm:mb-4">
            <Egg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-green-600" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Fresh From Our Community Farms
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Affordable, farm-fresh eggs and poultry products produced sustainably
            within local communities. No middlemen, no inflated prices.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {products.map(product => (
            <div key={product.id} className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
              <div className="h-32 sm:h-40 md:h-48 bg-gray-200 overflow-hidden">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                    ₦{product.price_ngn.toLocaleString()}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500">/ {product.unit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={onVisitStore}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-base sm:text-lg font-semibold"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
