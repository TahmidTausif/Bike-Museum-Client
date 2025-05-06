import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { useGetAllProductsQuery } from '../redux/features/products/productApi';
import { TProduct } from '../redux/types/product';
import { RingLoader } from 'react-spinners';

const AllProducts = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    brand: '',
    sortBy: '' as keyof TProduct | '',
    sortOrder: 'asc' as 'asc' | 'desc',
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
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

      <div className="flex gap-8">
        {/* Sidebar Filter Box */}
        <form
          onSubmit={e => {
            e.preventDefault();
            applyFilters();
          }}
          className="w-full md:w-1/4 text-white backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 p-4 h-fit space-y-4"
        >
          <h3 className="text-xl font-semibold text-white">Filters</h3>

          {/* Search Input */}
          <div>
            <input
              className="input input-bordered border border-white/40 rounded-lg p-3 mb-3 text-white w-full"
              placeholder="Search..."
              value={filters.searchTerm}
              onChange={e => setFilters({ ...filters, searchTerm: e.target.value })}
            />
          </div>

          {/* Category Options */}
          <div>
            <label className="block font-medium mb-3">Category</label>
            <div className="flex flex-wrap mb-2 gap-2">
              {['', 'Mountain', 'Road', 'Hybrid', 'Electric'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={`btn btn-sm px-2.5 py-1 rounded-full shadow-xl border border-white/20 ${filters.category === cat
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-700 text-white'
                    : 'text-white backdrop-blur-md bg-white/10 '
                    }`}
                  onClick={() => setFilters({ ...filters, category: cat })}
                >
                  {cat || 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Options */}
          <div>
            <label className="block font-medium mb-3">Brand</label>
            <div className="flex flex-wrap mb-2 gap-2">
              {[
                '',
                'Trek',
                'Specialized',
                'Cannondale',
                'Rad Power Bikes',
                'Aventon',
                'Turboant',
                'Juiced Bikes',
                'Yamaha',
                'Hero',
                'Suzuki',
              ].map(brand => (
                <button
                  key={brand}
                  type="button"
                  className={`btn btn-sm px-2.5 py-1 rounded-full shadow-xl border border-white/20 ${filters.brand === brand
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-700 text-white'
                    : 'text-white backdrop-blur-md bg-white/10'
                    }`}
                  onClick={() => setFilters({ ...filters, brand })}
                >
                  {brand || 'All'}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By Options */}
          <div>
            <label className="block font-medium mb-3">Sort By</label>
            <div className="flex flex-wrap mb-2 gap-2">
              {['', 'price', 'name', 'category'].map(sort => (
                <button
                  key={sort}
                  type="button"
                  className={`btn btn-sm px-2.5 py-1 rounded-full shadow-xl border border-white/20 ${filters.sortBy === sort
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-700 text-white'
                    : 'text-white backdrop-blur-md bg-white/10 '
                    }`}
                  onClick={() => setFilters({ ...filters, sortBy: sort as keyof TProduct })}
                >
                  {sort || 'None'}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Order Options */}
          <div>
            <label className="block font-medium mb-3">Sort Order</label>
            <div className="flex mb-2 gap-2">
              {['asc', 'desc'].map(order => (
                <button
                  key={order}
                  type="button"
                  className={`btn btn-sm px-2.5 py-1.5 rounded-full shadow-xl border border-white/20 ${filters.sortOrder === order
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-700 text-white'
                    : 'text-white backdrop-blur-md bg-white/10 '
                    }`}
                  onClick={() => setFilters({ ...filters, sortOrder: order as 'asc' | 'desc' })}
                >
                  {order === 'asc' ? 'Lowest' : 'Highest'}
                </button>
              ))}
            </div>
          </div>

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
              <RingLoader size={80} color="#C2410C" />
            </div>
          ) : error ? (
            <div className="text-white">Error fetching products.</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {paginatedProducts.length === 0 ? (
                  <div className="text-center text-white col-span-full">No products found.</div>
                ) : (
                  paginatedProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                  ))
                )}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
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
