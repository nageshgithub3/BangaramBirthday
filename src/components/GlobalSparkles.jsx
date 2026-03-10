import { useState, useEffect } from "react";
import { Heart, Sparkle } from "lucide-react";

export default function GlobalSparkles() {
    const [sparkles, setSparkles] = useState([]);
    const [cursorHearts, setCursorHearts] = useState([]);

    // Generate random sparkles
    useEffect(() => {
        const generateSparkle = () => {
            const id = Math.random();
            const newSparkle = {
                id,
                left: `${Math.random() * 100}%`,
                bottom: `0%`,
                size: Math.random() * 20 + 10,
                color: ["#ec4899", "#f472b6", "#d946ef", "#8b5cf6"][Math.floor(Math.random() * 4)],
                delay: Math.random() * 5,
                duration: Math.random() * 10 + 10,
            };

            setSparkles((prev) => [...prev.slice(-30), newSparkle]);
        };

        const interval = setInterval(generateSparkle, 1000);
        return () => clearInterval(interval);
    }, []);

    // Cursor trail logic
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (Math.random() > 0.8) { // Only emit a heart occasionally
                const id = Math.random();
                setCursorHearts((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY }]);
                setTimeout(() => {
                    setCursorHearts((prev) => prev.filter((h) => h.id !== id));
                }, 1000);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
                {sparkles.map((s) => (
                    <div
                        key={s.id}
                        className="floating-heart text-pink-500 opacity-20"
                        style={{
                            left: s.left,
                            bottom: "-5%",
                            fontSize: `${s.size}px`,
                            color: s.color,
                            animationDuration: `${s.duration}s`,
                        }}
                    >
                        {Math.random() > 0.5 ? <Heart size={s.size} fill="currentColor" /> : "❤️"}
                    </div>
                ))}
            </div>

            {cursorHearts.map((h) => (
                <span
                    key={h.id}
                    className="cursor-trail"
                    style={{
                        left: h.x,
                        top: h.y,
                    }}
                >
                    ❤️
                </span>
            ))}
        </>
    );
}
