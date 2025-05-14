import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetSingleProductQuery } from "../../redux/features/products/productApi";
import { ScaleLoader } from "react-spinners";

const OrderForm = () => {
  const { id } = useParams();
  const url = "https://bike-museum-server-tan.vercel.app/api";

  const currentUser = useAppSelector(useCurrentUser);

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetSingleProductQuery(id as string);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);

  const inputClasses =
    "border border-white/30 text-white p-2 w-full rounded-xl text-center border-one placeholder-opacity-70";

  interface IOrderData {
    user?: string;
    product: string;
    email: string;
    phone: number;
    address: string;
    transactionId: number;
    totalPrice?: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderData>();

  const onSubmit = (data: IOrderData) => {
    if (userLoading) {
      console.log("Loading user data...");
      return;
    }

    if (userError) {
      console.error("Error fetching user data:", userError);
      return;
    }

    if (!user?.data?._id) {
      console.error("User ID is missing. Full user data:", user);
      return;
    }

    data.transactionId = Number(Date.now());
    data.product = id as string;
    data.user = user.data._id;
    data.totalPrice = productData?.data?.price || 0;

    console.log("Submitting Order:", data);

    axios
      .post(`${url}/orders/create-order`, data)
      .then((result) => {
        console.log("Order created:", result.data);
        axios
          .post(`${url}/payment/initiate`, data)
          .then((paymentResult) => {
            console.log("Payment initiated:", paymentResult.data);
            window.location.href = paymentResult.data.url;
          })
          .catch((error) => {
            console.error("Error:", error.response?.data || error.message);
          });
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
      });
  };

  return (
    <div className="w-11/12 mx-auto my-10 bg-four py-10 text-white">
      <div className="flex flex-col md:flex-row gap-10 items-start justify-center">
        {/* Left: Product Info */}
        <div className="md:w-1/2 w-full px-4">
          {productLoading ? (
            <div className="flex justify-center items-center h-48">
              <ScaleLoader color="white" />
            </div>
          ) : productError ? (
            <p className="text-center text-white">Failed to load product.</p>
          ) : (
            <div className=" border border-white/30 rounded-xl text-white shadow-md">
              <img
                src={productData?.data?.photo}
                alt={productData?.data?.name}
                className="w-full h-64 object-cover rounded-t-xl mb-4"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{productData?.data?.name}</h2>
                <p className="mb-1"><strong>Category:</strong> {productData?.data?.category}</p>
                <p><strong>Price:</strong> ৳{productData?.data?.price}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Form */}
        <div className="md:w-1/2 w-full px-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Order Form</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <h2 className="text-lg mb-2">Your Email</h2>
              <input
                type="text"
                {...register("email", { required: "Email is required" })}
                placeholder="example@gmail.com"
                className={inputClasses}
              />
              {errors.email && <span className="text-pink-400">{errors.email.message}</span>}
            </div>

            {/* Address */}
            <div>
              <h2 className="text-lg mb-2">Address</h2>
              <input
                type="text"
                {...register("address", { required: "Address is required" })}
                placeholder="Street, Village, District"
                className={inputClasses}
              />
              {errors.address && <span className="text-pink-400">{errors.address.message}</span>}
            </div>

            {/* Phone */}
            <div>
              <h2 className="text-lg mb-2">Phone Number</h2>
              <input
                type="number"
                {...register("phone", {
                  required: "Phone number is required",
                  valueAsNumber: true,
                })}
                placeholder="01XXXXXXXXX"
                className={inputClasses}
              />
              {errors.phone && <span className="text-pink-400">{errors.phone.message}</span>}
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm text-white font-medium rounded-full shadow-xl border border-white/20 backdrop-blur-md bg-gradient-to-r from-purple-600 to-pink-600 hover:from-white/5 hover:to-white/5 transition-colors duration-300"
              >
                Confirm Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

};

export default OrderForm;
