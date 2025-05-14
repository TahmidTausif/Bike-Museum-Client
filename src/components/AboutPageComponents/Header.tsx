

interface HeaderProps {
  image: string;
  text: string;
}

const Header: React.FC<HeaderProps> = ({ image, text }) => {
  return (
    <div>
      <div
        className="relative h-56 lg:h-[400px] w-full flex items-center justify-center bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Overlay / Mask */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        {/* Text content on top */}
        <h1 className="relative z-10 lg:text-7xl text-3xl md:text-4xl font-bold text-white">
          {text}
        </h1>
      </div>

    </div>
  );
};

export default Header;
