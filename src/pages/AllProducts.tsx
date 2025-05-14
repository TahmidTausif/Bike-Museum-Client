import { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useGetAllProductsQuery } from '../redux/features/products/productApi';
import { TProduct } from '../redux/types/product';
import { ScaleLoader } from 'react-spinners';

const AllProducts = () => {


  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    brand: '',
    sortBy: '' as keyof TProduct | '',
    sortOrder: 'asc' as 'asc' | 'desc',
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryFromURL = query.get('category');
    if (categoryFromURL) {
      setFilters(prev => ({ ...prev, category: categoryFromURL }));
      setAppliedFilters(prev => ({ ...prev, category: categoryFromURL }));
    }
  }, [location.search]);

  const [page, setPage] = useState(1);
  const limit = 6;

  const { data, isLoading, error } = useGetAllProductsQuery({});

  const allProducts = useMemo(() => {
    if (!data?.data) return [];

    let filtered = [...data.data];

    const { searchTerm, category, brand, sortBy, sortOrder } = appliedFilters;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        [product.name, product.brand, product.category]
          .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    if (brand) {
      filtered = filtered.filter(product => product.brand === brand);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue === undefined) return 1;
        if (bValue === undefined) return -1;

        return sortOrder === 'asc'
          ? aValue > bValue ? 1 : aValue < bValue ? -1 : 0
          : aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      });
    }

    return filtered;
  }, [data, appliedFilters]);

  const total = allProducts.length;
  const totalPages = Math.ceil(total / limit);
  const paginatedProducts = allProducts.slice((page - 1) * limit, page * limit);

  const applyFilters = () => {
    setAppliedFilters(filters);
    setPage(1);
  };

  return (
    <div className="container  mx-auto px-14 py-20 overflow-y-auto">
      <h2 className="text-4xl text-white font-bold mb-8">All Products</h2>

      <div className="flex flex-col md:flex-row  gap-8">
        {/* Sidebar Filter Box */}
        <form
          onSubmit={e => {
            e.preventDefault();
            applyFilters();
          }}
          className="w-full md:w-1/4 text-white backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 p-4 md:py-8 h-fit space-y-4"
        >
          <h3 className="text-2xl font-semibold text-white">Filters</h3>

          {/* Search Input */}
          <div>
            <input
              className="input input-bordered border border-white/40 rounded-lg p-3 mb-3 text-white w-full"
              placeholder="Search..."
              value={filters.searchTerm}
              onChange={e => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>

          {/* Collapsible Category Select */}
          <details className="mb-4">
            <summary className="cursor-pointer font-medium mb-1">Category</summary>
            <select
              className="select select-bordered w-full bg-white/10 text-white border-white/20 p-1 rounded-md"
              value={filters.category}
              onChange={e => setFilters({ ...filters, category: e.target.value })}
            >
              <option value="" className='bg-gray-500'>All</option>
              <option value="Mountain" className='bg-gray-500'>Mountain</option>
              <option value="Road" className='bg-gray-500'>Road</option>
              <option value="Hybrid" className='bg-gray-500'>Hybrid</option>
              <option value="Electric" className='bg-gray-500'>Electric</option>
            </select>
          </details>

          {/* Collapsible Brand Select */}
          <details className="mb-4">
            <summary className="cursor-pointer font-medium mb-1">Brand</summary>
            <select
              className="select select-bordered w-full bg-white/10 text-white border-white/20 p-1 rounded-md"
              value={filters.brand}
              onChange={e => setFilters({ ...filters, brand: e.target.value })}
            >
              <option value="" className='bg-gray-500'>All</option>
              <option value="Trek" className='bg-gray-500'>Trek</option>
              <option value="Specialized" className='bg-gray-500'>Specialized</option>
              <option value="Cannondale" className='bg-gray-500'>Cannondale</option>
              <option value="Rad Power Bikes" className='bg-gray-500'>Rad Power Bikes</option>
              <option value="Aventon" className='bg-gray-500'>Aventon</option>
              <option value="Turboant" className='bg-gray-500'>Turboant</option>
              <option value="Juiced Bikes" className='bg-gray-500'>Juiced Bikes</option>
              <option value="Yamaha" className='bg-gray-500'>Yamaha</option>
              <option value="Hero" className='bg-gray-500'>Hero</option>
              <option value="Suzuki" className='bg-gray-500'>Suzuki</option>
            </select>
          </details>

          {/* Collapsible Sort By Select */}
          <details className="mb-4">
            <summary className="cursor-pointer font-medium mb-1">Sort By</summary>
            <select
              className="select select-bordered w-full bg-white/10 text-white border-white/20 p-1 rounded-md"
              value={filters.sortBy}
              onChange={e => setFilters({ ...filters, sortBy: e.target.value as keyof TProduct })}
            >
              <option value="" className='bg-gray-500'>None</option>
              <option value="price" className='bg-gray-500'>Price</option>
              <option value="name" className='bg-gray-500'>Name</option>
              <option value="category" className='bg-gray-500'>Category</option>
            </select>
          </details>

          {/* Collapsible Sort Order Select */}
          <details className="mb-4">
            <summary className="cursor-pointer font-medium mb-1">Sort Order</summary>
            <select
              className="select select-bordered w-full p-1 rounded-md bg-white/10 text-white border-white/20"
              value={filters.sortOrder}
              onChange={e => setFilters({ ...filters, sortOrder: e.target.value as 'asc' | 'desc' })}
            >
              <option value="asc" className='bg-gray-500'>Lowest</option>
              <option value="desc" className='bg-gray-500'>Highest</option>
            </select>
          </details>


          {/* Apply and Clear Buttons */}
          <div className="flex border-t border-white/20 pt-4 gap-2">
            <button type="submit" className="btn btn-primary px-2.5 py-1.5 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 w-1/2">
              Apply
            </button>
            <button
              type="button"
              className="btn btn-outline px-2.5 py-1.5 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 w-1/2"
              onClick={() => {
                const initial = {
                  searchTerm: '',
                  category: '',
                  brand: '',
                  sortBy: '' as keyof TProduct | '',
                  sortOrder: 'asc' as 'asc' | 'desc',
                };
                setFilters(initial);
                setAppliedFilters(initial);
                setPage(1);
              }}
            >
              Clear
            </button>
          </div>
        </form>





        {/* Product Grid */}
        <div className="flex-1">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-screen">
              <ScaleLoader color="white" />
            </div>
          ) : error ? (
            <div className="text-white">Error fetching products.</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 pb-4 gap-10">
                {paginatedProducts.length === 0 ? (
                  <div className="text-center text-white col-span-full">No products found.</div>
                ) : (
                  paginatedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                <button
                  className={`btn btn-primary px-4 py-1.5 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 mx-2 ${page === 1 ? 'btn-disabled' : 'btn-outline'}`}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Prev
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    className={`btn px-4 py-1 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md bg-white/10 
        ${page === idx + 1
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600  text-white'  // Active page button
                        : 'btn-outline hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors duration-300' // Inactive page button
                      } mx-2`}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  className={`btn btn-primary px-4 py-1.5 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-colors duration-300 mx-2 ${page === totalPages ? 'btn-disabled' : 'btn-outline'}`}
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
