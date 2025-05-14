import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import axios from "axios";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

type ApiError = {
  status?: number;
  data?: {
    message?: string;
    error?: string;
  };
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);

      const image = data.image[0];
      const newFormData = new FormData();
      newFormData.append("file", image);
      newFormData.append("upload_preset", "rakib001");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtrek2mmx/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url || response.data.url;

      const { name, email, password } = data;
      const userInfo = {
        name,
        email,
        password,
        role: "user", // Role fixed to "user"
        imageUrl,
      };
      console.log("Registering user with:", userInfo);

      const result = await registerUser(userInfo).unwrap();

      if (result?.success) {
        toast.success("Registration Successful!", { duration: 2000 });
        reset();
        navigate("/login"); // keep this unchanged
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      console.error("Registration Error =>", error);
      console.log("Error message:", error?.data?.message);

      toast.error(error?.data?.message || "Something went wrong", {
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <ScaleLoader  color="white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-14 bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 px-4">
      <div className="max-w-md w-full backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 text-white  p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-3">Get Started</h1>
        <p className="text-center text-gray-400 mb-8">
          Unlock access to a wide range of books with just a few details!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter your name..."
                className={`w-full px-4 py-2 text-white rounded-lg border border-white/20 ${errors.name
                  ? "border-purple-600 focus:ring-purple-600"
                  : "border-gray-700 focus:ring-gray-500"
                } focus:outline-none focus:ring-2`}
              />
              {typeof errors.name?.message === "string" && (
                <p className="text-pink-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="Enter your email..."
                className={`w-full px-4 py-2 text-white rounded-lg border border-white/20 ${errors.email
                  ? "border-purple-600 focus:ring-purple-600"
                  : "border-gray-700 focus:ring-gray-500"
                } focus:outline-none focus:ring-2`}
              />
              {typeof errors.email?.message === "string" && (
                <p className="text-pink-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  className={`w-full px-4 py-2 text-white rounded-lg border border-white/20 ${errors.password
                    ? "border-purple-600 focus:ring-purple-600"
                  : "border-gray-700 focus:ring-gray-500"
                  } focus:outline-none focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
              </div>
              {typeof errors.password?.message === "string" && (
                <p className="text-pink-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image</label>
              <input
                {...register("image", { required: "Image is required" })}
                type="file"
                accept="image/*"
                className={`w-full px-4 py-2 text-white rounded-lg border border-white/20 ${errors.image
                  ? "border-purple-600 focus:ring-purple-600"
                  : "border-gray-700 focus:ring-gray-500"
                } focus:outline-none focus:ring-2`}
              />
              {typeof errors.image?.message === "string" && (
                <p className="text-pink-400 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white font-medium rounded-full shadow-xl border border-white/20 backdrop-blur-md  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-white/5 hover:to-white/5 transition-colors duration-300 flex items-center justify-center"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
