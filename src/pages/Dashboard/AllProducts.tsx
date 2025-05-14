import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
    useGetAllProductsQuery,
    useDeleteProductMutation,
  } from "../../redux/features/products/productApi";
import { ScaleLoader } from "react-spinners";

const AllProducts = () => {
    const navigate = useNavigate();
      const { data: productData, isLoading: productsLoading, refetch: refetchProduct } =
        useGetAllProductsQuery({});
        const products = productData?.data || [];
        const [deleteProduct] = useDeleteProductMutation();
        const handleDelete = async (id: string) => { 
            try {
              
              await deleteProduct(id).unwrap();
              toast.success("Product deleted successfully");
        
              refetchProduct()
              
            } catch (err) {
              console.error(err);
              toast.error("Failed to delete product");
            }
          };

          if ( productsLoading ) {
              return (
                <div className="flex items-center justify-center min-h-screen px-4">
                  <ScaleLoader  color="white" />
                </div>
              );
            }
    return (
        <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#3A2E42] p-4 rounded-lg mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Manage Products</h3>

              <div className="flex justify-end mb-4">
                <button
                  onClick={() => navigate("/admin/dashboard/products/add")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Product
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#2B1E36]">
                    <tr>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Price</th>
                      <th className="p-3 text-left">Stock</th>
                      <th className="p-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.map((product) => (
                      <tr key={product._id}>
                        <td className="p-3">{product.name}</td>
                        <td className="p-3">৳ {product.price}</td>
                        <td className="p-3">{product.inStock}</td>
                        <td className="p-3 flex gap-2">
                          <button
                            onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
        </div>
    );
};

export default AllProducts;