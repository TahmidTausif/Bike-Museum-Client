import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom'; 
import { useGetAllProductsQuery } from '../../redux/features/products/productApi'; 
import ProductCard from '../ProductCard'; 
import { TProduct } from '../../redux/types/product';
import {  ScaleLoader } from 'react-spinners';

const FeatureSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState<TProduct[]>([]);


  // Fetched all products from the API
  const { data, isLoading, error } = useGetAllProductsQuery({});

  // Update the featured products with desired number of data 
  useEffect(() => {
    if (data && data.data) {
      setFeaturedProducts(data.data.slice(0, 5)); 
    }
  }, [data]);

  return (
    <section className="p-14 my-10">
      <h2 className="text-4xl  text-white font-bold mb-3 text-center">Featured Products</h2>
      <h3 className='text-white pb-10 text-center tracking-wider font-playFair text-lg '>Best of our Beasts</h3>

      {/* Check for loading or error */}
      {isLoading ? (
              <div className="flex items-center justify-center min-h-screen  px-4">
              <ScaleLoader  color="white" />
            </div>
      ) : error ? (
        <div className="text-red-500 text-center">Error fetching products.</div>
      ) : (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="text-center text-white">No featured products available.</div>
          )}
        </div>
      )}

      {/* View More Button */}
      <div className="text-center mt-6 pt-8">
      <Link to={`/products`} className="mt-4 px-10 py-4 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-600 hover:to-purple-600 transition-colors duration-300">
            View More
          </Link>
      </div>
    </section>
  );
};

export default FeatureSection;
