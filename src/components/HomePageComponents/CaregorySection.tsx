import { Link } from "react-router-dom";
import { Bike, Bolt, Mountain, Route } from "lucide-react";

const categories = [
  { name: "Mountain", icon: <Mountain className="h-8 w-8 text-white" /> },
  { name: "Road", icon: <Route className="h-8 w-8 text-white" /> },
  { name: "Hybrid", icon: <Bike className="h-8 w-8 text-white" /> },
  { name: "Electric", icon: <Bolt className="h-8 w-8 text-white" /> },
];

const CategorySection = () => {
  return (
    <section className="px-4 py-14 mb-14 ">
      <h2 className="text-4xl  text-white font-bold mb-3 text-center"> Categories</h2>
      <h3 className='text-white text-center tracking-wider font-playFair text-lg '>Choose Your Ride</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {categories.map(({ name, icon }) => (
          <Link
            key={name}
            to={`/products?category=${name}`}
            className="mt-10 p-6 flex flex-col items-center justify-center hover:shadow-lg hover:-translate-y-1 transition backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20"
          >
            {icon}
            <span className="mt-3 text-lg font-medium text-white">{name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
