import { motion } from "framer-motion";
import Header from "../components/AboutPageComponents/Header";
import banner from "../assets/banner3.jpg"

const ContactPage = () => {
    return (
        <div>
            <section className=""><Header image={banner} text={"Contact Us"} ></Header></section>
            <section className="py-16 px-4 w-full ">
                <motion.h2
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl font-bold text-center mb-10 text-white"
                >
                    Contact Us
                </motion.h2>

                <form className="max-w-3xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="p-3  backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 text-white w-full"
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="p-3  backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 text-white w-full "
                        />
                    </div>
                    <textarea
                        placeholder="Your Message"
                        rows={5}
                        className="p-3 text-white backdrop-blur-md bg-white/10 rounded-xl shadow-xl border border-white/20 w-full"
                    ></textarea>
                    <button
                        type="submit"
                        className="mt-2 px-6 py-3 text-sm text-white font-medium rounded-full shadow-xl border border-white/20 backdrop-blur-md  bg-gradient-to-r from-purple-600 to-pink-600 hover:from-white/5 hover:to-white/5 transition-colors duration-300 flex items-center justify-center"
                    >
                        Send Message
                    </button>
                </form>
            </section>
        </div>
    );
};

export default ContactPage;