import { FaQuoteLeft } from "react-icons/fa";


interface ClientCardProps {
  img: string;
  comment: string;
  name: string;
}

const Client_Card: React.FC<ClientCardProps> = ({ img, comment, name }) => {
  return (
    <div className="mt-20 mb-8 h-full">
      <div className="relative mx-auto backdrop-blur-md bg-black/10 rounded-xl shadow-xl border border-white/20 px-6 pt-16 pb-8 h-full flex flex-col justify-between">
        {/* Quote Icon */}
        <div className="absolute top-5 left-5 text-primary text-5xl opacity-40">
          <FaQuoteLeft className="text-white" />
        </div>

        {/* Profile Image */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full z-20 overflow-hidden shadow-lg w-20 h-20 border-2 border-white/30 bg-white/20">
          <img
            className="object-cover w-full h-full"
            src={img}
            alt="Client Image"
          />
        </div>

        {/* Card Content */}
        <div className="mt-6 text-center flex flex-col flex-grow justify-between">
          {/* Set fixed min height for comment to equalize layout */}
          <p className="font-roboto text-white text-accent text-sm px-2 min-h-[100px]">
            {comment}
          </p>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-white font-playFair">{name}</h2>
            <p className="text-sm text-white text-accent font-roboto">Client</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Client_Card;
