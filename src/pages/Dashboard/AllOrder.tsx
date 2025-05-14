import { motion } from "framer-motion";
import {  useAppSelector } from "../../redux/hooks";
import {  useCurrentUser } from "../../redux/features/auth/authSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetAdminOrdersDataQuery } from "../../redux/features/orders/orderApi";
import { TOrder } from "../../redux/types/order";
import { ScaleLoader } from "react-spinners";

const AllOrder = () => {
      const currentUser = useAppSelector(useCurrentUser);
const { data: orderData, isLoading: ordersLoading } =
    useGetAdminOrdersDataQuery(currentUser?.email ?? skipToken);

    if (ordersLoading ) {
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
              className="bg-[#3A2E42] p-4 rounded-lg mt-8"
            >
              <h3 className="text-xl font-bold mb-4">Manage Orders</h3>
              <table className="w-full">
                <thead className="bg-[#3A2E42]">
                  <tr>
                    <th className="p-3 text-left">Transaction ID</th>
                    <th className="p-3 text-left">Buyer</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.map((item: TOrder) => (
                    <tr key={item._id}>
                      <td className="p-3">{item.transactionId}</td>
                      <td className="p-3">{item?.userInfo?.name}</td>
                      <td className="p-3">৳ {item?.product?.price}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
        </div>
    );
};

export default AllOrder;