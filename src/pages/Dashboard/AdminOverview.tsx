import {  useAppSelector } from "../../redux/hooks";
import {  useCurrentUser } from "../../redux/features/auth/authSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { TOrder } from "../../redux/types/order";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { useGetAllUserDataQuery } from '../../redux/features/auth/authApi';
import { useGetAllProductsQuery } from '../../redux/features/products/productApi';
import { useGetAdminOrdersDataQuery } from "../../redux/features/orders/orderApi";
import { ScaleLoader } from "react-spinners";


const COLORS = ['#4ade80', '#60a5fa', '#f87171'];

const AdminOverview = () => {
    const currentUser = useAppSelector(useCurrentUser);
  const { data: usersData, isLoading: usersLoading } = useGetAllUserDataQuery({});
  const { data: orderData, isLoading: ordersLoading } =
      useGetAdminOrdersDataQuery(currentUser?.email ?? skipToken);
   const { data: productData, isLoading: productsLoading, } =
          useGetAllProductsQuery({});

  const totalUsers = usersData?.data?.length;
  const totalOrders = orderData?.data?.length;
  const totalProducts = productData?.data?.length;

  // Group orders by status
  const orderStatusData = [
    {
      name: 'Completed',
      value: orderData?.data?.filter((order: TOrder) => order.status === 'completed').length,
    },
    {
      name: 'Pending',
      value: orderData?.data?.filter((order: TOrder) => order.status === 'pending').length,
    },
    {
      name: 'Cancelled',
      value: orderData?.data?.filter((order: TOrder) => order.status === 'cancelled').length,
    },
  ];

  // Dummy monthly data (replace with real backend logic)
  const monthlyData = [
    { name: 'Jan', products: 2, orders: 0 },
    { name: 'Feb', products: 7, orders: 0 },
    { name: 'Mar', products: 1, orders: 0 },
    { name: 'Apr', products: 3, orders: 0 },
    { name: 'May', products: 2, orders: 0 },
    { name: 'Jun', products: 2, orders: 0 },
  ];

  if (usersLoading || ordersLoading || productsLoading) {
    return <ScaleLoader color="white" className="text-center"/>;
  }

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Admin Overview</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#3A2E42] shadow rounded-2xl p-5">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold mt-2 text-green-500">{totalUsers}</p>
        </div>

        <div className="bg-[#3A2E42] shadow rounded-2xl p-5">
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-3xl font-bold mt-2 text-blue-500">{totalOrders}</p>
        </div>

        <div className="bg-[#3A2E42] shadow rounded-2xl p-5">
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="text-3xl font-bold mt-2 text-yellow-500">{totalProducts}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <div className="bg-[#2B1E36] border-2 border-[#3A2E42] shadow rounded-2xl p-5 h-[300px]">
          <h4 className="text-lg font-semibold mb-4">Monthly Sales Overview</h4>
          <ResponsiveContainer width="100%" height="90%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#60a5fa" />
              <Bar dataKey="products" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#2B1E36] shadow rounded-2xl p-5 h-[300px]">
          <h4 className="text-lg font-semibold mb-4">Order Status Distribution</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {orderStatusData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
