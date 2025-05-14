import Header from "../components/AboutPageComponents/Header";
import banner from "../assets/banner3.jpg";
import person1 from "../assets/images/person1.png";
import person2 from "../assets/images/person2.png";
import person3 from "../assets/images/person3.png";
import person4 from "../assets/images/person4.png";


import { motion } from "framer-motion";
import AboutHighlight from "../components/HomePageComponents/AboutHighlight";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Justine Trudo",
    role: "Founder, Bike Museum",
    image: person1,
  },
  {
    name: "Samiul Badri",
    role: "CEO, Bike Museum",
    image: person2,
  },
  {
    name: "Rasel Arnold",
    role: "Marketing Manager",
    image: person3,
  },
  {
    name: "Samantha Richard",
    role: "Customer Support",
    image: person4,
  },
];

export default function AboutPage() {
  return (
    <div className=" text-white">
      {/* Banner Header */}
      <section>
        <Header image={banner} text={"About Us"} />
      </section>

      {/* Welcome Section */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white"
        >
          Welcome to the <span className="text-white">Bike Museum</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-gray-300"
        >
          We’re passionate about bikes, history, and innovation. Our mission is
          to connect riders with the best machines and celebrate the evolution
          of cycling.
        </motion.p>
      </section>

      <AboutHighlight />


      {/* Team Section */}
      <section className="py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-10 text-white"
        >
          Meet Our Team
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white/10 hover:bg-white/20 transition duration-300 rounded-xl p-6 shadow-xl text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 md:w-28  h-24 md:h-36  mx-auto object-top mb-4"
              />
              <h3 className="text-xl font-semibold text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-300">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA Section (Optional) */}
      <section className="text-center flex flex-col gap-6 mb-10 py-20 bg-white/5">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white"
        >
          Want to Reach Out?
        </motion.h3>
        <p className=" text-gray-300">
          We’d love to hear from you! Whether it’s a partnership or a bike
          inquiry, get in touch.
        </p>
        <div>
          <Link to={"/contact"} className="mt-10 px-6 py-3 text-sm text-white font-medium rounded-full shadow-xl border border-white/20 backdrop-blur-md  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-white/5 hover:to-white/5 transition-colors duration-300">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
