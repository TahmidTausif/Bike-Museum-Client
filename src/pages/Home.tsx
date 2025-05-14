import Testimonial from "../components/HomePageComponents/Testimonial";
import Banner from "../components/HomePageComponents/Banner";
import FeatureSection from "../components/HomePageComponents/FeaturedProducts";

import ServiceSection from "../components/HomePageComponents/ServiceSection";
import MarqueeSection from "../components/HomePageComponents/MarqueeSection";
import AboutHighlight from "../components/HomePageComponents/AboutHighlight";
import CategorySection from "../components/HomePageComponents/CaregorySection";
 // 



const Home = () => {
  return (
    <div className="font-sans">

      {/* Banner Section */}
      <Banner />

      {/* Marquee with bike images */}
      <MarqueeSection/>

     <CategorySection/>
      <ServiceSection/>
      <FeatureSection/>
      <AboutHighlight />

      {/* Testimonials */}
      <Testimonial />


    </div>
  );
};

export default Home;
