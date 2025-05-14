import { Link } from "react-router-dom";

type Props = {
  product: {
    _id: string;
    name: string;
    brand: string;
    price: number;
    category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
    photo?: string;
    description: string;
    quantity: number;
    inStock: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="card relative group hover:scale-110 transition-all duration-300 flex flex-col backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20">
      <figure className="w-full relative rounded-t-xl">
        <div className="absolute top-4 left-4 rounded-full px-3 py-1 bg-pink-600/90">
          <span className="font-semibold text-white">{product.category}</span>
        </div>
        <img
          src={product.photo}
          alt={product.name}
          className="h-48 w-full rounded-t-xl object-cover"
        />
      </figure>

      {/* Give this div relative positioning and padding bottom for space */}
      <div className="card-body relative p-4 pb-16 flex flex-col flex-1">
        <div className="absolute top-0 left-2/4 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full backdrop-blur-md bg-pink-600/90 flex items-center justify-center text-center">
          <p className="font-bold text-xl text-white">${product.price}</p>
        </div>

        <h2 className="card-title text-white pt-10 text-xl font-bold">{product.name}</h2>
        <p className="text-lg font-light text-white/90">
          Brand: <span className="font-semibold">{product.brand}</span>
        </p>

        {/* Button shown only on hover */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
          <Link
            to={`/products/${product._id}`}
            className="btn btn-outline px-4 py-2 rounded-full shadow-xl border border-white/20 text-white backdrop-blur-md bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
