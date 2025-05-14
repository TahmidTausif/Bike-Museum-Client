import logo from '../assets/logos.png'
import { FaSquareFacebook, FaTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className=" text-gray-300">
      <div className="container mx-auto">
        <footer className="md:flex  gap-6 p-10  items-start justify-around">
          <aside className="max-w-52 ">
            <a href={"/"}>
              <img src={logo} alt="logo" height={90} width={150} />
            </a>
            <h4 className=" text-lg text-white/90 font-bold">
              Bike Museum Co. Ltd.
              <br />
              <p className="font-roboto text-base font-medium text-gray-300">Your trusted destination for premium bikes & accessories.</p>
            </h4>

            <ul className="flex gap-4 mt-4">
              <a>
                <FaSquareFacebook className="text-2xl text-white/90 hover:scale-130 transition-all duration-300" />
              </a>
              <a>
                <FaTwitter className="text-2xl text-white/90   hover:scale-130 transition-all duration-300" />
              </a>
              <a>
                <IoLogoYoutube className="text-2xl text-white/90  hover:scale-130 transition-all duration-300" />
              </a>
            </ul>
          </aside>

          <div className='flex flex-col md:w-1/2 md:flex-row gap-10 pt-8 md:pt-0 justify-around'>
            <nav className="flex flex-col gap-2">
              <h6 className="text-lg font-bold text-white max-w-44 ">Company</h6>
              <Link to={"/about-us"} className="link link-hover">About Us</Link>
              <Link to={"/products"} className="link link-hover">Collections</Link>
              <Link to={'/contact'} className="link link-hover">Contact Us</Link>
            </nav>

            <nav className="flex flex-col gap-2">
              <h6 className="text-lg font-bold text-white max-w-44">Categories</h6>
              {['Mountain', 'Road', 'Hybrid', 'Electric'].map(cat => (
                <Link key={cat} to={`/products?category=${cat}`} className="link link-hover">
                  {cat}
                </Link>
              ))}
            </nav>
          </div>


        </footer>



        <aside className="py-12 text-center">
          <h4 className="px-3">
            Copyright &copy; 2025 All Rights Reserved | This Website is made
            with by <span className="text-pink-400">Bike Museum</span>
          </h4>
        </aside>
      </div>
    </div>
  );
}

export default Footer;
