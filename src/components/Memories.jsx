import React from "react";
import { motion } from "framer-motion";
import { Camera, Image as ImageIcon, MessageSquare } from "lucide-react";

const memoriesList = [
    {
        title: "Laughing Together",
        image: "/laughing.png",
        caption: "Those moments of pure joy when we can't stop laughing.",
        icon: <MessageSquare className="w-8 h-8 text-pink-400" />
    },
    {
        title: "Walking Together",
        image: "/walking.png",
        caption: "The peaceful walks where the world fades away.",
        icon: <Camera className="w-8 h-8 text-purple-400" />
    },
    {
        title: "Sharing Ice Cream",
        image: "/icecream.png",
        caption: "Sweet moments shared over our favorite treats.",
        icon: <ImageIcon className="w-8 h-8 text-blue-400" />
    },
    {
        title: "Sitting Under Stars",
        image: "/sitting.png",
        caption: "Watching the night sky and dreaming of the future.",
        icon: <Camera className="w-8 h-8 text-yellow-500" />
    }
];

const Memories = ({ onComplete }) => {
    return (
        <div className="min-h-screen py-12 md:py-20 px-4 md:px-8 lg:px-20 bg-gradient-to-b from-transparent to-[#1a0b2e] overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12 md:mb-20 flex flex-col items-center justify-center space-y-4"
            >
                <h2 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-400 leading-tight">
                    Moments That Make Life Beautiful 📸
                </h2>
                <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl mx-auto italic px-4">
                    Every memory we share is a chapter in our beautiful story.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
                {memoriesList.map((memory, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="group relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl bg-[#2a1a3a] border border-white/10 hover:border-pink-500/30 transition-all duration-500 w-full mx-auto"
                    >
                        <div className="relative aspect-[4/3] sm:aspect-square md:aspect-[4/3] overflow-hidden">
                            <motion.img
                                src={memory.image}
                                alt={memory.title}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.6 }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                            <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full">
                                <div className="bg-white/10 backdrop-blur-md p-2 rounded-lg md:rounded-xl mb-2 md:mb-4 text-white inline-block shadow-lg">
                                    {React.cloneElement(memory.icon, { className: "w-5 h-5 md:w-8 md:h-8" })}
                                </div>
                                <h3 className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">{memory.title}</h3>
                                <p className="text-pink-200/90 text-sm md:text-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity delay-100 italic">
                                    "{memory.caption}"
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="mt-16 md:mt-24 text-center pb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="bg-love-pink text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-2xl font-black shadow-[0_0_30px_rgba(236,72,153,0.4)] flex items-center gap-2 md:gap-3 mx-auto"
                >
                    Wait, One More Thing... 🎁
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Memories;
