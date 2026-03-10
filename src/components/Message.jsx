import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Sparkles, Music, Star } from "lucide-react";

const specialReasons = [
    {
        title: "You always make me smile",
        desc: "Your laughter is my favorite sound in the world.",
        icon: <Heart className="w-8 h-8 text-pink-500" />
    },
    {
        title: "Your voice feels like a sweet song",
        desc: "Every word you say is like a beautiful melody to my ears.",
        icon: <Music className="w-8 h-8 text-purple-500" />
    },
    {
        title: "You support me when I feel low",
        desc: "You are the strong pillar I can always lean on.",
        icon: <Sparkles className="w-8 h-8 text-yellow-500" />
    },
    {
        title: "You are my Bangaram",
        desc: "More than just a name, you are my most precious treasure.",
        icon: <Star className="w-8 h-8 text-peach-500" />
    }
];

const Message = ({ onComplete, onBack }) => {
    return (
        <div className="min-h-screen py-16 md:py-20 px-4 md:px-10 flex flex-col items-center justify-center overflow-hidden">
            <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="text-3xl md:text-6xl font-black mb-12 md:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 leading-tight"
            >
                Why You Are Special To Me ✨
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto w-full">
                {specialReasons.map((reason, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="group relative bg-white/10 backdrop-blur-lg border border-white/20 p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden hover:bg-white/20 transition-all duration-300 w-full"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            {reason.icon}
                        </div>

                        <div className="mt-6 md:mt-8 space-y-3 md:space-y-4">
                            <h3 className="text-xl md:text-2xl font-bold text-pink-200 group-hover:text-pink-400 transition-colors">
                                {reason.title}
                            </h3>
                            <p className="text-gray-300 text-base md:text-lg group-hover:text-white transition-colors">
                                {reason.desc}
                            </p>
                        </div>

                        <div className="mt-6 md:mt-8 bg-gradient-to-r from-pink-500/20 to-purple-500/20 h-1 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 md:mt-20 flex flex-col sm:flex-row gap-4 md:gap-6 w-full sm:w-auto items-center">
                <motion.button
                    whileHover={{ x: -10 }}
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/60 hover:text-white font-medium order-2 sm:order-1"
                >
                    <ArrowLeft className="w-5 h-5" /> Back
                </motion.button>

                <motion.button
                    whileHover={{ x: 10 }}
                    onClick={onComplete}
                    className="bg-white text-black px-6 md:px-10 py-3 md:py-4 rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-pink-100 transition-colors order-1 sm:order-2 w-full sm:w-auto justify-center"
                >
                    See Our Memories <ArrowRight className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    );
};

export default Message;
