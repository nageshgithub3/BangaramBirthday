import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Confetti from "react-confetti";
import { animate, random, stagger } from "animejs";
import { Sparkles, Heart, Gift, Stars } from "lucide-react";

const Surprise = ({ onComplete }) => {
    const [showConfetti, setShowConfetti] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [heartsCount, setHeartsCount] = useState(0);
    const containerRef = useRef(null);

    const handleSurprise = () => {
        setShowConfetti(true);
        setShowPopup(true);
        setHeartsCount(heartsCount + 20);

        // Trigger Anime.js v4 effects
        animate({
            targets: ".floating-heart",
            translateX: () => random(-200, 200),
            translateY: () => random(-700, -200),
            scale: () => random(0.5, 2),
            opacity: [1, 0],
            rotate: () => random(-180, 180),
            duration: 3000,
            ease: "out-expo", // v4 uses 'ease' and kebab-case for some things or slightly different names
            delay: stagger(100)
        });

        const audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"); // Placeholder for birthday music
        audio.play().catch(e => console.log("Audio play prevented", e));
    };

    return (
        <div ref={containerRef} className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden px-4">
            {showConfetti && <Confetti width={containerRef.current?.offsetWidth || window.innerWidth} height={containerRef.current?.offsetHeight || window.innerHeight} recycle={false} numberOfPieces={300} />}

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="text-center z-10 w-full"
            >
                <motion.h2
                    className="text-4xl md:text-7xl font-black mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 leading-tight"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Your Birthday Surprise! 🎁
                </motion.h2>

                {!showPopup ? (
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: [-1, 1, -1] }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSurprise}
                        className="group relative bg-love-pink text-white px-8 md:px-16 py-6 md:py-8 rounded-full text-2xl md:text-4xl font-black shadow-[0_0_50px_rgba(236,72,153,0.6)] hover:shadow-pink-400/80 transition-all font-outfit mx-auto"
                    >
                        <span className="flex items-center gap-2 md:gap-4 justify-center">
                            Click For Magic <Gift className="w-8 h-8 md:w-12 md:h-12 group-hover:scale-125 transition-transform" />
                        </span>
                        <motion.div
                            className="absolute inset-0 bg-white/20 rounded-full"
                            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </motion.button>
                ) : (
                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className="max-w-xl mx-auto p-6 md:p-12 bg-white/10 backdrop-blur-2xl rounded-3xl md:rounded-[3rem] border-2 border-pink-500/30 shadow-2xl relative"
                        >
                            <div className="absolute -top-5 md:-top-10 -left-5 md:-left-10 bg-pink-500 p-2 md:p-4 rounded-full shadow-lg">
                                <Heart className="w-6 h-6 md:w-10 md:h-10 text-white fill-current" />
                            </div>
                            <div className="absolute -bottom-5 md:-bottom-10 -right-5 md:-right-10 bg-purple-500 p-2 md:p-4 rounded-full shadow-lg">
                                <Sparkles className="w-6 h-6 md:w-10 md:h-10 text-white fill-current" />
                            </div>

                            <h3 className="text-2xl md:text-5xl font-black text-pink-300 mb-4 md:mb-6 drop-shadow-lg">
                                Happy Birthday My Bangaram ❤️
                            </h3>
                            <p className="text-lg md:text-2xl text-white leading-relaxed mb-6 md:mb-10 font-medium">
                                "You are one of the most precious people in my life. Every day with you is a gift I cherish."
                            </p>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={onComplete}
                                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-xl flex items-center justify-center gap-2 w-full"
                            >
                                Almost Finished... <Stars className="w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    </AnimatePresence>
                )}
            </motion.div>

            {/* Floating Hearts Container */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden h-screen w-full">
                {[...Array(heartsCount)].map((_, i) => (
                    <Heart
                        key={i}
                        className="floating-heart absolute text-pink-500 fill-current"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `90%`,
                            fontSize: `${Math.random() * 2 + 1}rem`
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default Surprise;
