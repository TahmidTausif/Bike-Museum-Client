import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useGetUserByEmailQuery } from "../../redux/features/auth/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Home, LogOut, Menu, X, User } from "lucide-react"; // Add the User icon
import UserOrderData from "./UserOrderData";

const UserDashboard = () => {
  const currentUser = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isExpanded, setIsExpanded] = useState<boolean>(window.innerWidth >= 768);

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByEmailQuery(currentUser?.email ?? skipToken);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsExpanded(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (userLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <ScaleLoader color="white" />
      </div>
    );
  }

  if (userError) {
    toast.error("Failed to fetch data. Please try again later.");
    return null;
  }

  if (!userData?.data?.email) {
    toast.error("User email is missing!");
    return null;
  }

  return (
    <div className="min-h-screen max-w-screen overflow-y-hidden flex bg-[#2B1E36] text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-[#2B1E36] min-h-screen fixed top-0 left-0 z-50 h-full transition-all duration-300 shadow-lg 
        ${isExpanded ? "w-64" : "w-20"} p-4 flex flex-col justify-between`}
      >
        <div>
          {/* Header */}
          <div className="flex justify-between items-center  mb-6">
            {isExpanded && <h2 className="text-xl font-bold ml-2">Dashboard</h2>}
            <button className="ml-3" onClick={toggleSidebar}>
              {isExpanded ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Profile */}
          {isExpanded && (
            <div className="text-center mb-6">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={userData?.data?.imageUrl || "/default-profile.png"}
                alt="Admin"
                className="w-20 h-20 rounded-full mx-auto mb-2 border-2 border-purple-400"
              />
              <h2 className="text-lg font-semibold">{userData?.data?.name || "Admin"}</h2>
              <p className="text-xs text-gray-400">{userData?.data?.email}</p>
              <p className="text-xs text-gray-400">Role: {userData?.data?.role}</p>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${activeTab === "overview" ? "bg-purple-600" : "bg-[#3A2E42]"} hover:bg-purple-500`}
            >
              <User size={20} /> {/* User icon */}
              {isExpanded && <span>User Data</span>}
            </button>
            {/* Add more navigation items here if needed */}
          </nav>
        </div>

        {/* Footer Buttons */}
        <div className="flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600"
          >
            <Home size={18} />
            {isExpanded && <span>Home</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-600 hover:to-purple-600"
          >
            <LogOut size={18} />
            {isExpanded && <span>Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 bg-[#2B1E36] ml-12  p-6 transition-all duration-300 ${isExpanded ? "md:ml-64" : "md:ml-24"}`}>
        {activeTab === "overview" && <UserOrderData />}
      </main>
    </div>
  );
};

export default UserDashboard;
