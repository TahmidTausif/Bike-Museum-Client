import Testimonial from "../components/HomePageComponents/Testimonial";
import Banner from "../components/HomePageComponents/Banner";
import FeatureSection from "../components/HomePageComponents/FeaturedProducts";

import ServiceSection from "../components/HomePageComponents/ServiceSection";
import MarqueeSection from "../components/HomePageComponents/MarqueeSection";
 // 



const Home = () => {
  return (
    <div className="font-sans">

      {/* Banner Section */}
      <Banner />

      {/* Marquee with bike images */}
      <MarqueeSection/>

      {/* Special Services Section with larger text and image */}
       <ServiceSection/>
        <FeatureSection/>

      {/* Testimonials */}
      <Testimonial />


    </div>
  );
};

export default Home;
