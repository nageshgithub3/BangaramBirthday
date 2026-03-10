import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, Heart } from "lucide-react";

const StarBackground = () => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
        const starCount = window.innerWidth < 768 ? 100 : 200;
        const items = [...Array(starCount)].map((_, i) => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            duration: `${Math.random() * 3 + 2}s`,
            delay: `${Math.random() * 5}s`
        }));
        setStars(items);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[-2]">
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                        "--duration": star.duration,
                        animationDelay: star.delay
                    }}
                />
            ))}
        </div>
    );
};

const FinalScene = () => {
    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
            <StarBackground />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
                className="relative max-w-5xl w-full mx-auto"
            >
                <div className="relative aspect-square md:aspect-video rounded-3xl md:rounded-[3rem] overflow-hidden border-2 border-white/20 shadow-2xl bg-white/5 backdrop-blur-md">
                    <img
                        src="/end_page.png"
                        alt="Watching Stars"
                        className="w-full h-full object-contain p-6 md:p-12 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-8 md:mt-16 text-center space-y-8 md:space-y-12"
                >
                    <div className="space-y-4 md:space-y-6">
                        <h2 className="text-3xl md:text-7xl font-black text-white leading-tight px-4">
                            This little website <br className="hidden md:block" />
                            <span className="text-pink-400">was made only for you.</span>
                        </h2>
                        <p className="text-lg md:text-3xl text-pink-200/60 font-medium max-w-xl md:max-w-2xl mx-auto italic px-4">
                            "Because you deserve something special, something as beautiful as your soul."
                        </p>
                    </div>

                    <div className="space-y-4">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex items-center justify-center"
                        >
                            <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-500 fill-current" />
                        </motion.div>
                        <h2 className="text-4xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 leading-tight">
                            Happy Birthday ❤️
                        </h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="flex items-center justify-center gap-2 md:gap-3 text-white/30 text-sm md:text-lg font-medium"
                    >
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                        Made with all my heart
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};


export default FinalScene;
export { StarBackground };
