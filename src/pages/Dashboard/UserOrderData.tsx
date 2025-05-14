
import { motion } from "framer-motion";
import {  useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserOrdersDataQuery } from "../../redux/features/orders/orderApi";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { TOrder } from "../../redux/types/order";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";
const UserOrderData = () => {
    const currentUser = useAppSelector(useCurrentUser);
    const {
        data: userData,
        isLoading: userLoading,
        error: userError,
    } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);
    const {
        data: orderResponse,
        isLoading: ordersLoading,
        error: ordersError,
    } = useGetUserOrdersDataQuery(userData?.data?._id ?? skipToken);

    if (userLoading || ordersLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen px-4">
                <ScaleLoader color="white" />
            </div>
        );
    }
    if (userError || ordersError) {
        toast.error("Failed to fetch data. Please try again later.");
        return null;
    }

    if (!userData?.data?.email) {
        toast.error("User email is missing!");
        return null;
    }

    const orderData = orderResponse?.data || [];
    const priceData = orderData.map((item: TOrder) => Number(item?.product?.price));
    const totalPrice = priceData?.reduce((sum: number, price: number) => sum + price, 0) || 0;

    return (
        <div>
            <motion.main
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 min-h-screen w-full bg-[#2B1E36] p-4 md:p-6 transition-all duration-300 overflow-x-hidden"
            >
                <h1 className="text-lg md:text-2xl font-bold mb-6">Order Summary</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <motion.div whileHover={{ scale: 1.02 }} className="bg-[#3A2E42] p-2 md:p-4 rounded-lg">
                        <h3 className="text-sm md:text-xl text-gray-400">Total Spend</h3>
                        <p className="text-lg md:text-2xl font-bold">৳ {totalPrice}</p>
                        <div className="h-1 bg-purple-500 mt-2 rounded-full w-3/4" />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} className="bg-[#3A2E42] p-4 rounded-lg">
                        <h3 className="text-sm md:text-xl text-gray-400">Active Orders</h3>
                        <p className="text-lg md:text-2xl font-bold">{orderData.length}</p>
                        <div className="h-1 bg-green-500 mt-2 rounded-full w-1/2" />
                    </motion.div>
                </div>

                <div className="overflow-x-auto w-full">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-lg md:text-2xl font-bold">Order Summary</h1>
                    </div>
                    <table className="min-w-[100px] overflow-hidden w-full">
                        <thead className="bg-[#3A2E42]">
                            <tr>
                                <th className="p-2 md:p-3 text-[10px] md:text-sm text-left">Transaction ID</th>
                                <th className="p-2 md:p-3 text-[10px] md:text-sm text-left">Product Name</th>
                                <th className="p-2 md:p-3 text-[10px] md:text-sm text-left">Brand</th>
                                <th className="p-2 md:p-3 text-[10px] md:text-sm text-left">Price</th>
                                <th className="p-2 md:p-3 text-[10px] md:text-sm text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((item: TOrder) => (
                                <tr key={item._id}>
                                    <td className="p-2 md:p-3 text-[10px] md:text-sm text-left">{item.transactionId}</td>
                                    <td className="p-2 md:p-3 text-[10px] md:text-sm text-left">{item.product?.name}</td>
                                    <td className="p-3 text-xs md:text-md">{item.product?.brand}</td>
                                    <td className="p-2 md:p-3 text-[10px] md:text-sm text-left">৳ {item.product?.price}</td>
                                    <td className="p-2 md:p-3 text-[10px] md:text-sm text-left">
                                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.main>
        </div>
    );
};

export default UserOrderData;