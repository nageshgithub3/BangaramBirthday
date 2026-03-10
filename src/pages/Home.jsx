import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "../components/Hero";
import Message from "../components/Message";
import Memories from "../components/Memories";
import Surprise from "../components/Surprise";
import FinalScene, { StarBackground } from "../components/FinalScene";
import GlobalSparkles from "../components/GlobalSparkles";
import ShaderBackground from "../components/ShaderBackground";
import ButterflyShader from "../components/ButterflyShader";

const Home = () => {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef(null);

    // Auto-scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeStep]);

    const nextStep = () => {
        setActiveStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setActiveStep((prev) => Math.max(0, prev - 1));
    };

    const steps = [
        <Hero onComplete={nextStep} />,
        <Message onComplete={nextStep} onBack={prevStep} />,
        <Memories onComplete={nextStep} />,
        <Surprise onComplete={nextStep} />,
        <FinalScene />
    ];

    return (
        <div ref={containerRef} className="relative min-h-screen selection:bg-pink-500 selection:text-white">
            <ShaderBackground />
            {activeStep === 0 && <ButterflyShader />}
            {/* Background stays global */}
            {activeStep === 0 || activeStep === 4 ? <StarBackground /> : (
                <div className="fixed inset-0 bg-gradient-to-tr from-[#1a0b2e] via-[#0d0717] to-[#120821] z-[-2]" />
            )}

            {/* Global decorative elements */}
            <GlobalSparkles />
            <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[150px] rounded-full" />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {steps[activeStep]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Home;
