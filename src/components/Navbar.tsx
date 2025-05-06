import { Link } from 'react-router-dom';
import logo from '../assets/logos.png';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, useCurrentUser } from '../redux/features/auth/authSlice';
import { useGetUserByEmailQuery } from '../redux/features/auth/authApi';
import { Menu, X } from 'lucide-react'; // Optional icon library or use any SVG
import {  ScaleLoader } from 'react-spinners';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(useCurrentUser);
  const { data: user, isLoading: userLoading } = useGetUserByEmailQuery(currentUser?.email ?? '');
  const [scrolled, setScrolled] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth_token");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (userLoading) {
    return (
      <div className="flex justify-center items-center">
        <ScaleLoader/>
      </div>
    );
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 px-14 py-4 backdrop-blur-md shadow-lg shadow-purple-900/20
      ${scrolled ? 'bg-gradient-to-r from-gray-900/90 via-purple-900/90 to-gray-900/90' : 'bg-gradient-to-r from-gray-900/70 via-purple-900/70 to-gray-900/70'}
    `}>
      
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/"><img className="h-[50px]" src={logo} alt="Logo" /></Link>

        {/* Hamburger menu - visible on mobile */}
        <button className="lg:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav items - Desktop */}
        <ul className="hidden lg:flex gap-6 ml-auto items-center">
          <li><Link to="/" className="text-white hover:text-gray-200">Home</Link></li>
          <li><Link to="/products" className="text-white hover:text-gray-200">All Products</Link></li>
          <li><Link to="/about-us" className="text-white hover:text-gray-200">About Us</Link></li>
        </ul>

        {/* User Avatar/Login - Desktop */}
        <div className="hidden lg:block ml-6">
          {currentUser && user ? (
            <div className="relative">
              <button
                className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-white"
                onClick={toggleDropdown}
                aria-label="User Menu"
              >
                <img
                  src={user?.data?.imageUrl || '/default.jpg'}
                  alt="User Avatar"
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 text-white bg-gradient-to-b from-orange-500 to-orange-700 border border-orange-400 rounded-lg shadow-lg z-50">
                  <ul className="py-1">
                    <li>
                      <Link
                        to={`/${user?.data?.role}/dashboard`}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="border px-4 py-1 rounded text-white hover:bg-orange-600">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 space-y-2">
          <ul className="flex flex-col gap-4 text-right">
            <li><Link to="/" className="text-white hover:text-gray-200" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/products" className="text-white hover:text-gray-200" onClick={toggleMenu}>All Products</Link></li>
            <li><Link to="/about-us" className="text-white hover:text-gray-200" onClick={toggleMenu}>About Us</Link></li>
          </ul>

          <div className="text-right mt-4">
            {currentUser && user ? (
              <div className="space-y-2">
                <Link
                  to={`/${user?.data?.role}/dashboard`}
                  className="block text-white hover:text-gray-200"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block text-white hover:text-gray-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-block border px-4 py-1 rounded text-white hover:bg-orange-600"
                onClick={toggleMenu}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
