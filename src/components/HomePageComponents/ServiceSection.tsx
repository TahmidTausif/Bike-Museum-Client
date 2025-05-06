import explore from "../../assets/images/explore.png";

const ServiceSection = () => {
    return (
        
            <div className="backdrop-blur-xl bg-white/5 my-20">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-14 pb-20 md:py-26 gap-16 container mx-auto ">
                    {/* Left Side - Large Text */}
                    <div className="lg:w-1/2 text-center pr-10 lg:text-left">
                        <h4 className="text-xl md:text-2xl font-medium text-white mb-4 md:mb-5 lg:mb-6 capitalize">
                            Explore New Bikes
                        </h4>
                        <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 md:mb-5 lg:mb-8 capitalize">
                            Check out our latest collection & special services
                        </h2>

                        <p className="text-xl md:text-2xl text-gray-50 leading-relaxed mb-4 md:mb-5 lg:mb-8">
                            Explore exclusive services that cater to vintage and modern bikes, from restoration to customization.
                        </p>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-pink-700 hover:to-purple-700 duration-300 rounded-xl shadow-lg shadow-pink-900/30 font-semibold transition-colors text-white px-6 py-3 border-0"
                        >
                            Book Now
                        </button>
                    </div>

                    {/* Right Side - Large Image */}
                    <div className="lg:w-1/2 w-full flex justify-center">
                        <img
                            src={explore}
                            alt="Special Bike Services"
                            className="md:rounded-2xl shadow-xl shadow-white/5 w-full max-w-4xl"  // Increased max width to make the image larger
                        />
                    </div>
                </div>
            </div>
    );
};

export default ServiceSection;