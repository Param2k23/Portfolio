import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';

// ============= CONFIGURATION CONSTANTS =============
const PASSWORD = '08062020';
const HER_NAME = 'Mauli ❤️';
// const VIDEO_SOURCE = '/mauli/video.mp4'; // Your custom video
// Background gallery images (24 images for scrolling background)
const BG_IMAGES = Array.from({ length: 24 }, (_, i) => `/mauli/images/bg-${i + 1}.jpg`);
// Memory card images
const MEMORY_IMAGES = [
    '/mauli/images/memory-1.png', // The Spark
    '/mauli/images/memory-2.png', // The Confession
    '/mauli/images/memory-3.png', // The Secret
    '/mauli/images/memory-4.png', // The Riverfront
    '/mauli/images/memory-5.png', // The Distance
    '/mauli/images/memory-6.png', // The Forever
];

const SpecialDelivery = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [showBirthdayConfetti, setShowBirthdayConfetti] = useState(false);
    const [revealStage, setRevealStage] = useState(0); // 0: initial, 1: riddle, 2: choice, 3: countdown, 4: video
    const [countdown, setCountdown] = useState(5);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === PASSWORD) {
            setIsUnlocked(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 8000);
            // Trigger birthday confetti when the text appears (after text animation delay)
            setTimeout(() => {
                setShowBirthdayConfetti(true);
                setTimeout(() => setShowBirthdayConfetti(false), 5000);
            }, 1500); // Trigger when birthday text starts appearing
        } else {
            // Shake animation for wrong password
            const input = document.getElementById('password-input');
            input.classList.add('shake');
            setTimeout(() => input.classList.remove('shake'), 500);
            setPasswordInput('');
        }
    };

    return (
        <>
            <Helmet>
                <meta name="robots" content="noindex, nofollow" />
                <title>Special Delivery</title>
            </Helmet>

            <div className="special-delivery-container">
                {/* Password Gate */}
                <AnimatePresence>
                    {!isUnlocked && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
                        >
                            <form onSubmit={handlePasswordSubmit} className="text-center">
                                <input
                                    id="password-input"
                                    type="password"
                                    value={passwordInput}
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    placeholder="enter our date : ddmmyyyy"
                                    className="px-6 py-4 text-xl text-white bg-transparent border-2 border-white/30 rounded-lg focus:outline-none focus:border-white/80 transition-all placeholder-white/50 text-center"
                                    autoFocus
                                />
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content */}
                {isUnlocked && (
                    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
                        {/* Confetti Animation */}
                        {showConfetti && <ConfettiExplosion />}

                        {/* Hero Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden"
                        >
                            {/* Photo Gallery Background */}
                            <PhotoGalleryBackground />

                            {/* Birthday Confetti - Triggered when text appears */}
                            {showBirthdayConfetti && <ConfettiExplosion />}

                            <motion.h1
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight relative z-10"
                                style={{
                                    textShadow: '0 0 40px rgba(255,255,255,0.4), 0 0 80px rgba(139,92,246,0.3)',
                                }}
                            >
                                Happy Birthday,
                                <br />
                                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
                                    {HER_NAME}
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1 }}
                                className="text-xl md:text-3xl text-purple-200 font-light italic max-w-3xl relative z-10"
                            >
                                Another year older, another year of unforgettable memories with you.
                                <br />
                                <span className="text-lg md:text-2xl mt-4 block">
                                    Today, we celebrate you—but also the beautiful journey we've shared.
                                    <br />
                                    Let's take a walk down memory lane...
                                </span>
                            </motion.p>

                            {/* Scroll indicator */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 2.5, repeat: Infinity, duration: 1.5 }}
                                className="absolute bottom-10 text-white/50 text-sm z-10"
                            >
                                ↓ Scroll to continue ↓
                            </motion.div>
                        </motion.section>

                        {/* Memory Cards Section */}
                        <section className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-950">
                            {/* Floating particles in background */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {Array.from({ length: 10 }).map((_, i) => (
                                    <motion.div
                                        key={`particle-${i}`}
                                        className="absolute w-2 h-2 bg-pink-300/20 rounded-full"
                                        animate={{
                                            y: [0, -100, 0],
                                            x: [0, Math.random() * 50 - 25, 0],
                                            opacity: [0.2, 0.5, 0.2],
                                        }}
                                        transition={{
                                            duration: 5 + Math.random() * 5,
                                            repeat: Infinity,
                                            delay: Math.random() * 5,
                                        }}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Floating Hearts */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <motion.div
                                        key={`heart-${i}`}
                                        className="absolute text-pink-400/30"
                                        animate={{
                                            y: [0, -800],
                                            x: [0, (Math.random() - 0.5) * 100],
                                            scale: [0.5, 1, 0.5],
                                            opacity: [0, 0.6, 0],
                                        }}
                                        transition={{
                                            duration: 8 + Math.random() * 4,
                                            repeat: Infinity,
                                            delay: Math.random() * 5,
                                            ease: "easeInOut",
                                        }}
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: '100%',
                                            fontSize: `${20 + Math.random() * 30}px`,
                                        }}
                                    >
                                        ❤️
                                    </motion.div>
                                ))}
                            </div>

                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 text-transparent bg-clip-text"
                            >
                                Our Story in Moments
                            </motion.h2>

                            <MemoryCard
                                title="The Spark"
                                description="It started in Mehsana, but it found us on Instagram. 'Hi Mehsana vasi, odkho cho ke bhuli gaya?'—ten words that changed my life. From childhood memories at Nani's house to a soft corner I couldn't ignore."
                                imageSrc={MEMORY_IMAGES[0]}
                                imagePosition="left"
                                delay={0}
                            />
                            <MemoryCard
                                title="The Confession"
                                description="That one afternoon when the world stood still. I finally told you: 'The girl I'm talking about is you.' Then came the late nights, the sunrises we watched through our screens, and the realization that I never wanted to stop talking to you."
                                imageSrc={MEMORY_IMAGES[1]}
                                imagePosition="right"
                                delay={0.2}
                            />
                            <MemoryCard
                                title="The Secret"
                                description="Our first meeting after it became 'us.' Surrounded by friends, yet in a world of our own. No one knew, but every silent nod and every hidden 'I love you' sign felt like a victory."
                                imageSrc={MEMORY_IMAGES[2]}
                                imagePosition="left"
                                delay={0.4}
                            />
                            <MemoryCard
                                title="The Riverfront"
                                description="The day the gap closed. We stood at the riverfront with enough space for a stranger to stand between us—shy, nervous, new. But then the distance vanished, and that first hug told me everything I needed to know about home."
                                imageSrc={MEMORY_IMAGES[3]}
                                imagePosition="right"
                                delay={0.6}
                            />
                            <MemoryCard
                                title="The Distance"
                                description="Australia to the USA. Different time zones, same moon. You are my rock, my support, and my greatest trust. Even when I'm busy, your understanding is the gift I don't deserve but cherish every day."
                                imageSrc={MEMORY_IMAGES[4]}
                                imagePosition="left"
                                delay={0.8}
                            />
                            <MemoryCard
                                title="The Forever"
                                description="Six years was just the beginning—the prologue to a book I want to write with you forever. My birthday wish for you is that this is the last year we have to celebrate with a screen between us. I want to be the one who wakes you up with coffee, the one who holds you through the hard days, and the one who sees every gray hair grow in. I don't just want a long-distance relationship; I want a long-life partnership. Happy Birthday, my love. Here's to a lifetime of us."
                                imageSrc={MEMORY_IMAGES[5]}
                                imagePosition="right"
                                delay={1.0}
                                isForever={true}
                            />
                        </section>

                        {/* Video Section - With Suspenseful Reveal */}
                        <section className="py-32 px-4 min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-purple-950 via-gray-900 to-gray-900">
                            {/* Ambient background effects */}
                            <div className="absolute inset-0">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.1, 0.2, 0.1],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1.2, 1, 1.2],
                                        opacity: [0.1, 0.2, 0.1],
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px]"
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8 }}
                                viewport={{ once: true }}
                                className="max-w-4xl mx-auto relative z-10 w-full"
                            >
                                <AnimatePresence mode="wait">
                                    {/* STAGE 0 Initial Teaser */}
                                    {revealStage === 0 && (
                                        <motion.div
                                            key="stage-0"
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.6 }}
                                            className="text-center"
                                        >
                                            <motion.h2
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3, type: "spring" }}
                                                className="text-4xl md:text-6xl font-bold text-white mb-6"
                                            >
                                                Wait... There's More! 🎉
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.6 }}
                                                className="text-xl md:text-2xl text-purple-200 mb-12 font-light italic"
                                            >
                                                The journey isn't over yet. I've hidden something special for you...
                                            </motion.p>

                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ delay: 0.9, duration: 0.8, type: "spring" }}
                                                className="mb-12"
                                            >
                                                <motion.div
                                                    animate={{
                                                        y: [0, -20, 0],
                                                        scale: [1, 1.1, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut",
                                                    }}
                                                    className="text-9xl mb-8"
                                                >
                                                    🔒
                                                </motion.div>
                                            </motion.div>

                                            <motion.button
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 1.2, type: "spring" }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setRevealStage(1)}
                                                className="px-10 py-5 text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all"
                                            >
                                                🔓 Start the Journey
                                            </motion.button>
                                        </motion.div>
                                    )}

                                    {/* STAGE 1: Riddle/Question */}
                                    {revealStage === 1 && (
                                        <motion.div
                                            key="stage-1"
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.6 }}
                                            className="text-center"
                                        >
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-4xl md:text-5xl font-bold text-white mb-8"
                                            >
                                                Question #1
                                            </motion.h2>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 mb-12"
                                            >
                                                <div className="text-7xl mb-6">🤔</div>
                                                <p className="text-2xl md:text-3xl text-purple-100 mb-8 font-light">
                                                    What makes every moment with you special?
                                                </p>

                                                <div className="space-y-4">
                                                    {['Your smile', 'Your laugh', 'Everything about you', 'All of the above'].map((answer, idx) => (
                                                        <motion.button
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.5 + idx * 0.1 }}
                                                            whileHover={{ scale: 1.05, x: 10 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => setRevealStage(2)}
                                                            className="w-full px-8 py-4 text-lg md:text-xl text-white bg-gradient-to-r from-purple-600/50 to-pink-600/50 hover:from-purple-600 hover:to-pink-600 rounded-xl border border-white/20 backdrop-blur-sm transition-all"
                                                        >
                                                            {answer}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </motion.div>

                                            <p className="text-purple-300 text-sm">Hint: They're all correct! 💝</p>
                                        </motion.div>
                                    )}

                                    {/* STAGE 2: Interactive Choice */}
                                    {revealStage === 2 && (
                                        <motion.div
                                            key="stage-2"
                                            initial={{ opacity: 0, rotateY: 90 }}
                                            animate={{ opacity: 1, rotateY: 0 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.6 }}
                                            className="text-center"
                                        >
                                            <motion.h2
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-4xl md:text-5xl font-bold text-white mb-8"
                                            >
                                                Choose Your Gift 🎁
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-xl text-purple-200 mb-12"
                                            >
                                                Pick the one that represents us best
                                            </motion.p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                                {[
                                                    { emoji: '💝', label: 'Love' },
                                                    { emoji: '🌟', label: 'Dreams' },
                                                    { emoji: '💑', label: 'Together' },
                                                    { emoji: '🎵', label: 'Music' },
                                                    { emoji: '💫', label: 'Magic' },
                                                    { emoji: '❤️', label: 'Forever' },
                                                ].map((item, idx) => (
                                                    <motion.button
                                                        key={idx}
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: 0.4 + idx * 0.1, type: "spring" }}
                                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => {
                                                            setRevealStage(3);
                                                            // Start countdown
                                                            const timer = setInterval(() => {
                                                                setCountdown((prev) => {
                                                                    if (prev <= 1) {
                                                                        clearInterval(timer);
                                                                        setRevealStage(4);
                                                                        return 5;
                                                                    }
                                                                    return prev - 1;
                                                                });
                                                            }, 1000);
                                                        }}
                                                        className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-purple-500/10 p-8 rounded-2xl border border-white/20 hover:border-pink-400/50 transition-all shadow-xl hover:shadow-pink-500/30"
                                                    >
                                                        <div className="text-6xl mb-3">{item.emoji}</div>
                                                        <div className="text-white font-semibold text-lg">{item.label}</div>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* STAGE 3: Countdown */}
                                    {revealStage === 3 && (
                                        <motion.div
                                            key="stage-3"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 1.5 }}
                                            transition={{ duration: 0.6 }}
                                            className="text-center"
                                        >
                                            <motion.h2
                                                className="text-3xl md:text-4xl font-bold text-white mb-12"
                                            >
                                                Get Ready... 💖
                                            </motion.h2>

                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                }}
                                                className="relative inline-block"
                                            >
                                                <div className="text-[150px] md:text-[200px] font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
                                                    {countdown}
                                                </div>

                                                {/* Pulsing rings */}
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 2],
                                                        opacity: [0.5, 0],
                                                    }}
                                                    transition={{
                                                        duration: 1,
                                                        repeat: Infinity,
                                                    }}
                                                    className="absolute inset-0 border-4 border-pink-400 rounded-full"
                                                />
                                            </motion.div>

                                            <motion.p
                                                animate={{ opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className="text-2xl text-purple-200 mt-8"
                                            >
                                                Your surprise is loading...
                                            </motion.p>
                                        </motion.div>
                                    )}

                                    {/* STAGE 4: Final Video Reveal */}
                                    {revealStage === 4 && (
                                        <motion.div
                                            key="stage-4"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.8, type: "spring" }}
                                        >
                                            <motion.h2
                                                initial={{ opacity: 0, y: -30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.5 }}
                                                className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
                                            >
                                                A Message From My Heart 💌
                                            </motion.h2>

                                            <motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.8 }}
                                                className="video-container rounded-2xl overflow-hidden shadow-2xl relative"
                                            >
                                                {/* Magical border glow */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-75 animate-pulse" />

                                                <div className="relative">
                                                    {/* Canva embed iframe */}
                                                    <div className="relative z-10 rounded-2xl overflow-hidden" style={{
                                                        position: 'relative',
                                                        width: '100%',
                                                        height: 0,
                                                        paddingTop: '56.25%',
                                                        boxShadow: '0 0 60px rgba(139,92,246,0.5)'
                                                    }}>
                                                        <iframe
                                                            title="Description of the video/content"
                                                            loading="lazy"
                                                            style={{
                                                                position: 'absolute',
                                                                width: '100%',
                                                                height: '100%',
                                                                top: 0,
                                                                left: 0,
                                                                border: 'none',
                                                                padding: 0,
                                                                margin: 0
                                                            }}
                                                            src="https://www.canva.com/design/DAG-KaLhSAc/5wQ9QYoJZDuE2GF_7QITZg/watch?embed"
                                                            allowFullScreen
                                                            allow="fullscreen"
                                                        />
                                                    </div>

                                                    {/* Attribution link styled to match theme */}
                                                    <div className="mt-4 text-center">
                                                        <a
                                                            href="https://www.canva.com/design/DAG-KaLhSAc/5wQ9QYoJZDuE2GF_7QITZg/watch?utm_content=DAG-KaLhSAc&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-sm text-purple-300/60 hover:text-purple-200 transition-colors"
                                                        >
                                                            Design by Param Kamleshkumar Patel
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Celebration particles explosion */}
                                            {[...Array(20)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0, x: 0, y: 0 }}
                                                    animate={{
                                                        scale: [0, 1.5, 0],
                                                        y: [0, -300 - Math.random() * 200],
                                                        x: [(Math.random() - 0.5) * 600],
                                                        opacity: [1, 1, 0],
                                                        rotate: [0, Math.random() * 360],
                                                    }}
                                                    transition={{
                                                        duration: 2 + Math.random(),
                                                        delay: i * 0.05,
                                                    }}
                                                    className="absolute text-4xl pointer-events-none"
                                                    style={{
                                                        left: '50%',
                                                        top: '50%',
                                                    }}
                                                >
                                                    {['💖', '✨', '🎉', '💫', '⭐', '❤️'][i % 6]}
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </section>
                    </div>
                )}

                <style jsx>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
          }

          .shake {
            animation: shake 0.5s;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }

          .special-delivery-container {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          /* Performance optimizations */
          * {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }

          video, img {
            will-change: transform;
            transform: translateZ(0);
          }

          [class*="backdrop-blur"] {
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
            transform: translateZ(0);
          }
        `}</style>
            </div>
        </>
    );
};

// ============= MEMORY CARD COMPONENT =============
const MemoryCard = ({ title, description, imageSrc, imagePosition, delay, isForever = false }) => {
    const { ref, inView } = useInView({
        threshold: 0.2,
        triggerOnce: true,
    });

    const isLeft = imagePosition === 'left';

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay }}
            className="max-w-7xl mx-auto mb-32 relative"
        >
            <div className={`flex flex-col ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
                {/* Image Container */}
                <motion.div
                    whileHover={{ scale: 1.05, rotate: isLeft ? -2 : 2 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full md:w-1/2 group"
                >
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                        {/* Glow effect behind image - Golden for Forever card, default gradient for others */}
                        <div className={`absolute -inset-1 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${isForever
                            ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400'
                            : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'
                            }`} />

                        {/* Image */}
                        <div className={`relative rounded-3xl overflow-hidden ${isForever
                            ? 'border-4 border-amber-400/40'
                            : 'border-4 border-white/10'
                            }`}>
                            <img
                                src={imageSrc}
                                alt={title}
                                className="w-full h-[300px] md:h-[400px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                        </div>
                    </div>

                    {/* Floating decorative elements */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-40"
                    />
                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -5, 0],
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-xl opacity-30"
                    />
                </motion.div>

                {/* Text Content Card */}
                <div className="w-full md:w-1/2 relative">
                    <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="backdrop-blur-2xl bg-gradient-to-br from-white/15 via-purple-500/10 to-pink-500/10 p-10 md:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden group"
                    >
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Sparkle effect */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full animate-pulse" />
                        <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-pink-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />

                        {/* Content */}
                        <div className="relative z-10">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={inView ? { width: '60px' } : { width: 0 }}
                                transition={{ delay: delay + 0.5, duration: 0.8 }}
                                className="h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 rounded-full mb-6"
                            />

                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                                {title}
                            </h3>

                            <p className="text-lg md:text-xl text-purple-100/90 leading-relaxed font-light">
                                {description}
                            </p>

                            {/* Decorative quote mark */}
                            <div className="absolute -top-4 -left-2 text-8xl text-pink-300/10 font-serif leading-none">
                                "
                            </div>
                        </div>

                        {/* Bottom glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

// ============= CONFETTI EXPLOSION COMPONENT =============
const ConfettiExplosion = () => {
    const colors = ['#ff0080', '#ff8c00', '#ffd700', '#00ff00', '#00bfff', '#9370db', '#ff1493', '#ffa500', '#ff69b4', '#32cd32'];
    const confettiPieces = Array.from({ length: 350 });

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confettiPieces.map((_, i) => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                // Spawn across ENTIRE width from top
                const startX = Math.random() * 100;
                const startY = -10 - Math.random() * 20;

                // Wobble side to side as it falls
                const drift = (Math.random() - 0.5) * 60;

                // Fall distance
                const fallDistance = 110 + Math.random() * 20;

                const randomDelay = Math.random() * 1.5;
                const randomDuration = 3 + Math.random() * 2.5;
                const randomRotation = Math.random() * 1800 - 900;
                const isRibbon = Math.random() > 0.4;

                return (
                    <motion.div
                        key={i}
                        initial={{
                            x: 0,
                            y: 0,
                            opacity: 0,
                            scale: 0,
                            rotate: Math.random() * 360,
                        }}
                        animate={{
                            x: drift,
                            y: fallDistance * 10,
                            opacity: [0, 1, 1, 0.8, 0],
                            scale: [0, 1.2, 1, 1, 0.4],
                            rotate: randomRotation,
                        }}
                        transition={{
                            duration: randomDuration,
                            delay: randomDelay,
                            ease: "linear",
                            opacity: { times: [0, 0.1, 0.5, 0.9, 1], ease: "easeInOut" }
                        }}
                        className="absolute"
                        style={{
                            left: `${startX}%`,
                            top: `${startY}%`,
                            width: isRibbon ? '18px' : '12px',
                            height: isRibbon ? '10px' : '12px',
                            backgroundColor: randomColor,
                            borderRadius: isRibbon ? '3px' : '50%',
                            boxShadow: `0 0 12px ${randomColor}80`,
                        }}
                    />
                );
            })}
        </div>
    );
};

// ============= PHOTO GALLERY BACKGROUND COMPONENT =============
const PhotoGalleryBackground = () => {
    // Using your custom background images
    const images = BG_IMAGES;

    return (
        <div className="absolute inset-0 overflow-hidden opacity-40">
            {/* Row 1 - Moving Left to Right */}
            <motion.div
                className="flex gap-6 mb-6"
                animate={{
                    x: ['-100%', '0%'],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ width: '200%' }}
            >
                {[...images, ...images].map((img, i) => (
                    <div
                        key={`row1-${i}`}
                        className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            loading="lazy"
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </motion.div>

            {/* Row 2 - Moving Right to Left */}
            <motion.div
                className="flex gap-6 mb-6"
                animate={{
                    x: ['0%', '-100%'],
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ width: '200%' }}
            >
                {[...images.slice(3), ...images.slice(3)].map((img, i) => (
                    <div
                        key={`row2-${i}`}
                        className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </motion.div>

            {/* Row 3 - Moving Left to Right (Slower) */}
            <motion.div
                className="flex gap-6 mb-6"
                animate={{
                    x: ['-100%', '0%'],
                }}
                transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                style={{ width: '200%' }}
            >
                {[...images.slice(6), ...images.slice(6)].map((img, i) => (
                    <div
                        key={`row3-${i}`}
                        className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-2xl border-2 border-white/10"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </motion.div>

            {/* Gradient overlay to blend with background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-purple-900/40 to-gray-900/60 pointer-events-none" />
        </div>
    );
};

export default SpecialDelivery;
