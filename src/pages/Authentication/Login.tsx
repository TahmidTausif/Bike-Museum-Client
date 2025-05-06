import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../redux/utils/verifyToken";
import { setUser, TUser } from "../../redux/features/auth/authSlice";

type LoginResponse = {
  success: boolean;
  data: {
    accessToken: string;
  };
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const result = (await login(data).unwrap()) as LoginResponse;
      const user = verifyToken(result.data.accessToken) as TUser;

      if (result?.success) {
        toast.success("Login successful!", { duration: 2000 });
      }

      dispatch(setUser({ user, token: result.data.accessToken }));
      localStorage.setItem("auth_token", result.data.accessToken);

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Login failed", { duration: 2000 });
      } else {
        toast.error("Login failed, wrong password or email", { duration: 2000 });
      }
    }
  };

  const fillAdminCredentials = () => {
    setValue("email", "Admin1@gmail.com");
    setValue("password", "Admin1@gmail.com");
  };

  const fillUserCredentials = () => {
    setValue("email", "user1@gmail.com");
    setValue("password", "password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-950 to-violet-900 px-4">
      <div className="max-w-md w-full text-white backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 p-8 md:p-12">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome Back</h1>
        <p className="text-center text-gray-200 mb-8">
          Log in to continue exploring our vast collection of books!
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
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
                className={`w-full px-4 py-2 text-white rounded-lg border border-white/20 ${
                  errors.email
                    ? "border-purple-600 focus:ring-purple-600"
                    : "border-gray-700 focus:ring-gray-500"
                } focus:outline-purple-600 focus:ring-2`}
              />
              {typeof errors.email?.message === "string" && (
                <p className="text-pink-400 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  className={`w-full px-4 py-2 text-white rounded-lg border border-white/20 ${
                    errors.password
                      ? "border-purple-600 focus:ring-purple-600"
                      : "border-gray-700 focus:ring-gray-500"
                  } focus:outline-purple-600 focus:ring-2`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" />
                  ) : (
                    <FaEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {typeof errors.password?.message === "string" && (
                <p className="text-pink-400 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Autofill Buttons */}
          <div className="flex flex-row gap-2">
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="w-full px-4 py-2 text-sm font-medium text-white rounded-xl shadow-xl border border-white/20 backdrop-blur-md bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-white/20  transition-colors duration-300"
            >
             Admin Credentials
            </button>
            <button
              type="button"
              onClick={fillUserCredentials}
              className="w-full px-4 py-2 text-sm font-medium text-white rounded-xl shadow-xl border border-white/20  backdrop-blur-md bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-white/20  transition-colors duration-300"
            >
              User Credentials
            </button>
          </div>

          {/* Submit/Login Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm text-white font-medium rounded-full shadow-xl border border-white/20 backdrop-blur-md  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-white/5 hover:to-white/5 transition-colors duration-300 flex items-center justify-center"
          >
            <p>Login</p>
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          New Here?{" "}
          <Link to={"/register"} className="text-pink-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
