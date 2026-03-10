import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 2500);
    const timer2 = setTimeout(() => setStep(2), 5000);
    const timer3 = setTimeout(() => setStep(3), 8000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 text-center overflow-hidden">
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-2xl md:text-5xl font-outfit font-light space-y-4 px-4"
        >
          <p>Hey...</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Today is not just another day.
          </motion.p>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="text-3xl md:text-6xl font-outfit px-4"
        >
          <p>Because someone very special was born today.</p>
        </motion.div>
      )}

      {step >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl w-full space-y-6 md:space-y-8 px-2"
        >
          <div className="relative">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 leading-tight"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Happy Birthday My Bangaram 💖
            </motion.h1>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="mt-6 md:mt-8 bg-white/10 p-4 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl mx-auto max-w-lg"
            >
              <img
                src="/src/assets/home_page.png"
                alt="Cute Couple"
                className="w-full h-auto max-w-xs md:max-w-md mx-auto rounded-xl md:rounded-2xl shadow-lg mb-4 md:mb-6"
              />
              <blockquote className="text-lg md:text-2xl text-pink-200 italic px-2">
                "You are not just my sister, You are my Koyila, My happiness, My energy when I feel low."
              </blockquote>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="mt-8 md:mt-12 group flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold shadow-xl hover:shadow-pink-500/30 transition-all mx-auto"
          >
            Click to See More 🌸
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default Hero;
