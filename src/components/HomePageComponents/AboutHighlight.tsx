import { FaBullseye, FaBookOpen, FaCogs, FaUsers, FaHandshake, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutHighlight = () => {
    return (
        <div className="backdrop-blur-xl bg-white/5 py-10">
            {/* About Highlights Section */}
            <h2 className="text-4xl mt-14 text-white font-bold mb-3 text-center">Why choose us</h2>
            <h3 className='text-white text-center tracking-wider font-playFair text-lg '>Offering Our Best</h3>
            <section className="py-14 px-14 mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            
                {/* Card 1: Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl p-6 shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <FaBullseye size={24} />
                        <h3 className="text-xl pl-2 font-bold">Our Mission</h3>
                    </div>
                    <ul className="text-gray-300 list-disc list-inside  space-y-1">
                        <li>Curate premium bikes & accessories</li>
                        <li>Preserve cycling history</li>
                        <li>Support every rider’s journey</li>
                        <li>Offer expert advice & service</li>
                    </ul>
                </motion.div>

                {/* Card 2: Cycling Heritage */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl p-6 shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <FaBookOpen size={24} />
                        <h3 className="text-xl pl-2 font-bold">Cycling Heritage</h3>
                    </div>
                    <ul className="text-gray-300 list-disc list-inside  space-y-1">
                        <li>Showcase rare vintage models</li>
                        <li>Research iconic designs</li>
                        <li>Support restoration efforts</li>
                        <li>Preserve bike culture</li>
                    </ul>
                </motion.div>

                {/* Card 3: Innovation */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl p-6 shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <FaCogs size={24} />
                        <h3 className="text-xl pl-2 font-bold">Innovation</h3>
                    </div>
                    <ul className="text-gray-300 list-disc list-inside  space-y-1">
                        <li>Carbon fiber frames & precision gearing</li>
                        <li>Hybrid and e-bike options</li>
                        <li>Eco-conscious design</li>
                        <li>Latest safety gear</li>
                    </ul>
                </motion.div>

                {/* Card 4: Community */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl p-6 shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <FaUsers size={24} />
                        <h3 className="text-xl pl-2 font-bold">Community</h3>
                    </div>
                    <ul className="text-gray-300 list-disc list-inside  space-y-1">
                        <li>Workshops & tours</li>
                        <li>Group rides & events</li>
                        <li>Educational content</li>
                        <li>Local partnerships</li>
                    </ul>
                </motion.div>

                {/* Card 5: Why Choose Us */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl p-6 shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <FaHandshake size={24} />
                        <h3 className="text-xl pl-2 font-bold">Why Choose Us</h3>
                    </div>
                    <ul className="text-gray-300 list-disc list-inside  space-y-1">
                        <li>Passionate & knowledgeable staff</li>
                        <li>Handpicked quality gear</li>
                        <li>Trusted by thousands</li>
                        <li>Inclusive biking culture</li>
                    </ul>
                </motion.div>

                {/* Card 6: Sustainability */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-xl p-6 shadow-lg"
                >
                    <div className="flex items-center gap-2 mb-2 text-white">
                        <FaLeaf size={24} />
                        <h3 className="text-xl pl-2 font-bold">Sustainability</h3>
                    </div>
                    <ul className="text-gray-300 list-disc list-inside space-y-1">
                        <li>Promote eco-friendly transport</li>
                        <li>Recycle and reuse vintage parts</li>
                        <li>Encourage low-emission lifestyles</li>
                        <li>Support green manufacturing</li>
                    </ul>
                </motion.div>
            </section>

        </div>
    );
};

export default AboutHighlight;