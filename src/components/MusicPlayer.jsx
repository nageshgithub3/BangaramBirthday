import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
    // Start as false to ensure the first click is the "activation"
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = "wlC_eFbxwDo";

    const toggleMusic = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Hidden YouTube Player - Render only when playing to satisfy interaction rules */}
            <div className="opacity-0 absolute pointer-events-none" style={{ width: '100px', height: '100px' }}>
                {isPlaying && (
                    <iframe
                        width="100"
                        height="100"
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&enablejsapi=1&origin=${window.location.origin}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                )}
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                className={`p-4 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.3)] flex items-center justify-center transition-all duration-500 ${isPlaying ? 'bg-pink-500 text-white' : 'bg-[#1a0b2e]/80 text-pink-400'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <Volume2 size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                        >
                            <VolumeX size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {isPlaying && (
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-pink-500"
                        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                )}
            </motion.button>
        </div>
    );
};

export default MusicPlayer;
