import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home() {
    // ===== LIVE STATE (subtle, cosmetic on the homepage) =====
    const [balance] = useState(12450)
    const [particles, setParticles] = useState([])
    const [activeActivity, setActiveActivity] = useState(0)

    // Floating gold particles (hero visual)
    useEffect(() => {
        const list = Array.from({ length: 18 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: 2 + Math.random() * 4,
            duration: 6 + Math.random() * 8,
            delay: Math.random() * 5,
            opacity: 0.15 + Math.random() * 0.35,
        }))
        setParticles(list)
    }, [])

    // Rotate activity highlight
    useEffect(() => {
        const t = setInterval(() => setActiveActivity((i) => (i + 1) % 3), 2600)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white overflow-x-hidden">

            {/* ============================================================
                HERO SECTION
            ============================================================ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT: Headline + CTAs */}
                    <div className="relative z-10">
                        <span className="inline-block text-[10px] sm:text-xs text-[#a88820] tracking-[5px] uppercase mb-5 border border-[#d4af37]/40 rounded-full px-4 py-1.5">
                            ✦ Golden Ace Casino ✦
                        </span>

                        <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-wider text-white mb-6">
                            THE HOUSE
                            <br />
                            <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(212,175,55,0.35)]">
                                IS READY.
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg text-[#c9c0ae] max-w-md mb-10 leading-relaxed">
                            Play. Compete. Win{" "}
                            <span className="text-[#d4af37] font-medium">virtual coins</span>.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button className="group relative px-8 py-4 rounded-full text-sm font-bold tracking-[2px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_30px_rgba(212,175,55,0.35)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] active:scale-95 overflow-hidden">
                                <span className="relative z-10">Play Now</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            </button>

                            <button className="px-8 py-4 rounded-full text-sm font-bold tracking-[2px] uppercase text-[#d4af37] bg-black/50 border border-[#d4af37]/70 backdrop-blur-sm transition-all duration-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] active:scale-95">
                                Explore Games
                            </button>
                        </div>
                    </div>

                    {/* RIGHT: Cinematic visual */}
                    <div className="relative z-0 h-[420px] sm:h-[520px]">
                        {/* Gold ambient glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.18),transparent_65%)] blur-2xl" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(212,175,55,0.10),transparent_60%)]" />

                        {/* Gold particles */}
                        {particles.map((p) => (
                            <span
                                key={p.id}
                                className="absolute rounded-full bg-[#d4af37] pointer-events-none"
                                style={{
                                    left: `${p.left}%`,
                                    top: `${p.top}%`,
                                    width: `${p.size}px`,
                                    height: `${p.size}px`,
                                    opacity: p.opacity,
                                    boxShadow: "0 0 8px rgba(212,175,55,0.8)",
                                    animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                                }}
                            />
                        ))}

                        {/* Roulette wheel */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div
                                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full border-[4px] border-[#d4af37] shadow-[0_0_80px_rgba(212,175,55,0.4),inset_0_0_60px_rgba(0,0,0,0.9)] animate-[spinSlow_40s_linear_infinite]"
                                style={{
                                    background:
                                        "conic-gradient(#d4af37 0deg 30deg,#1a1a1a 30deg 60deg,#d4af37 60deg 90deg,#1a1a1a 90deg 120deg,#d4af37 120deg 150deg,#1a1a1a 150deg 180deg,#d4af37 180deg 210deg,#1a1a1a 210deg 240deg,#d4af37 240deg 270deg,#1a1a1a 270deg 300deg,#d4af37 300deg 330deg,#1a1a1a 330deg 360deg)",
                                }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 bg-[#0a0a0a] border-[3px] border-[#d4af37] rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.5)]" />
                            </div>
                        </div>

                        {/* Floating playing cards */}
                        <FloatingCard rank="A" suit="♠" className="top-8 left-4 sm:top-10 sm:left-8 rotate-[-18deg]" delay="0s" />
                        <FloatingCard rank="K" suit="♥" red className="top-16 right-6 sm:top-20 sm:right-12 rotate-[15deg]" delay="0.6s" />
                        <FloatingCard rank="Q" suit="♦" red className="bottom-10 left-10 sm:bottom-14 sm:left-16 rotate-[8deg]" delay="1.2s" />
                        <FloatingCard rank="J" suit="♣" className="bottom-6 right-6 sm:bottom-10 sm:right-10 rotate-[-12deg]" delay="1.8s" />

                        {/* Floating dice */}
                        <div className="absolute top-4 right-1/3 sm:top-6 sm:right-1/3 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#f5e7c8] to-[#d4af37] rounded-xl flex items-center justify-center text-2xl font-bold text-[#0a0a0a] shadow-[0_0_30px_rgba(212,175,55,0.6)] animate-[float_5s_ease-in-out_infinite] rotate-[20deg]">
                            ⚄
                        </div>

                        {/* Floating slot symbols */}
                        <div className="absolute bottom-1/3 right-0 sm:right-2 text-4xl drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-[float_6s_ease-in-out_infinite]">
                            🍒
                        </div>
                        <div className="absolute top-1/3 left-0 text-4xl drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-[float_7s_ease-in-out_infinite]">
                            💎
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================
                BALANCE STATS STRIP
            ============================================================ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#d4af37]/25 rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                    <StatBlock label="Your Balance" value="12,450 Coins" highlight />
                    <StatBlock label="Games Played" value="128" />
                    <StatBlock label="Total Wins" value="74" />
                    <StatBlock label="Win Rate" value="57.8%" />
                </div>
            </section>

            {/* ============================================================
                FEATURED GAMES
            ============================================================ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
                <SectionHeading
                    kicker="✦ Featured Tables ✦"
                    title="Choose Your Game"
                    subtitle="Four ways to play. One premium experience."
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* DICE */}
                    <GameTile
                        title="DICE"
                        desc="Roll the dice and test your luck."
                        cta="Play Dice →"
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-[#f5e7c8] to-[#d4af37] rounded-2xl flex items-center justify-center text-4xl font-bold text-[#0a0a0a] shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_-4px_10px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110">
                            ⚂
                        </div>
                    </GameTile>

                    {/* ROULETTE */}
                    <GameTile
                        title="ROULETTE"
                        desc="Spin the wheel and choose your numbers."
                        cta="Play Roulette →"
                    >
                        <div
                            className="w-24 h-24 rounded-full border-[3px] border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.45),inset_0_0_20px_rgba(0,0,0,0.8)] transition-transform duration-[1200ms] group-hover:rotate-[180deg]"
                            style={{
                                background:
                                    "conic-gradient(#d4af37 0deg 30deg,#1a1a1a 30deg 60deg,#d4af37 60deg 90deg,#1a1a1a 90deg 120deg,#d4af37 120deg 150deg,#1a1a1a 150deg 180deg,#d4af37 180deg 210deg,#1a1a1a 210deg 240deg,#d4af37 240deg 270deg,#1a1a1a 270deg 300deg,#d4af37 300deg 330deg,#1a1a1a 330deg 360deg)",
                            }}
                        >
                            <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[#0a0a0a] border-2 border-[#d4af37] rounded-full" />
                        </div>
                    </GameTile>

                    {/* BLACKJACK */}
                    <GameTile
                        title="BLACKJACK"
                        desc="Challenge the dealer."
                        cta="Play Blackjack →"
                    >
                        <div className="relative w-24 h-24 flex items-center justify-center">
                            <MiniCard rank="A" suit="♠" className="absolute -rotate-[14deg] -translate-x-3" />
                            <MiniCard rank="K" suit="♥" red className="absolute rotate-[10deg] translate-x-3" />
                        </div>
                    </GameTile>

                    {/* SLOTS */}
                    <GameTile
                        title="SLOTS"
                        desc="Spin the reels and discover your result."
                        cta="Play Slots →"
                    >
                        <div className="flex gap-1.5">
                            {["🍒", "💎", "7️⃣"].map((s, i) => (
                                <div
                                    key={i}
                                    className="w-12 h-16 bg-[#0a0a0a] border-2 border-[#d4af37] rounded-md flex items-center justify-center text-2xl text-[#d4af37] shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:-translate-y-1"
                                    style={{ transitionDelay: `${i * 80}ms` }}
                                >
                                    {s}
                                </div>
                            ))}
                        </div>
                    </GameTile>

                </div>
            </section>

            {/* ============================================================
                LIVE ACTIVITY + TOP PLAYERS
            ============================================================ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* ACTIVITY */}
                <div className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-[#d4af37]/35 rounded-3xl p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-cinzel text-xl text-[#d4af37] tracking-widest uppercase flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-pulse" />
                            Recent Activity
                        </h3>
                        <span className="text-[10px] text-[#a88820] tracking-[2px] uppercase">Live</span>
                    </div>

                    <ul className="space-y-3">
                        {[
                            { name: "Alex", game: "Blackjack", amount: "+850", idx: 0 },
                            { name: "Mika", game: "Roulette", amount: "+1,200", idx: 1 },
                            { name: "Daniel", game: "Slots", amount: "+450", idx: 2 },
                            { name: "Sofia", game: "Dice", amount: "+320", idx: 3 },
                            { name: "Leo", game: "Blackjack", amount: "+1,500", idx: 4 },
                        ].map((a) => (
                            <li
                                key={a.idx}
                                className={`flex items-center justify-between py-3 px-4 rounded-xl border transition-all duration-500 ${
                                    activeActivity === a.idx % 3
                                        ? "border-[#d4af37]/60 bg-[#d4af37]/[0.06] shadow-[0_0_25px_rgba(212,175,55,0.1)]"
                                        : "border-[#d4af37]/10 bg-black/30"
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37]/30 to-[#a88820]/10 border border-[#d4af37]/40 flex items-center justify-center text-[11px] font-cinzel text-[#d4af37]">
                                        {a.name[0]}
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#f5e7c8]">{a.name}</p>
                                        <p className="text-[10px] text-[#a88820] tracking-[1.5px] uppercase">
                                            {a.game}
                                        </p>
                                    </div>
                                </div>
                                <span className="font-cinzel text-[#ffd966] text-sm drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]">
                                    {a.amount} Coins
                                </span>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-6 text-[10px] text-[#a88820]/60 italic text-center tracking-wider">
                        Virtual coins only · No real-money gambling
                    </p>
                </div>

                {/* TOP PLAYERS */}
                <div className="bg-gradient-to-br from-[#0f0f0f] to-[#0a0a0a] border border-[#d4af37]/35 rounded-3xl p-7 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]">
                    <h3 className="font-cinzel text-xl text-[#d4af37] tracking-widest uppercase mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                        Top Players
                    </h3>

                    <ul className="space-y-3">
                        {TOP_PLAYERS.map((p, i) => (
                            <li
                                key={p.name}
                                className={`flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 hover:border-[#d4af37]/70 hover:bg-[#d4af37]/[0.05] ${
                                    i === 0
                                        ? "border-[#d4af37]/70 bg-gradient-to-r from-[#d4af37]/[0.14] via-[#d4af37]/[0.05] to-transparent shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                                        : "border-[#d4af37]/15 bg-black/25"
                                }`}
                            >
                                <span
                                    className={`font-cinzel text-lg w-7 text-center ${
                                        i === 0 ? "text-[#ffd966]" : "text-[#a88820]"
                                    }`}
                                >
                                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                                </span>
                                <div
                                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-cinzel border ${
                                        i === 0
                                            ? "bg-gradient-to-br from-[#d4af37] to-[#a88820] text-[#0a0a0a] border-[#f5e7c8]"
                                            : "bg-[#141414] text-[#d4af37] border-[#d4af37]/40"
                                    }`}
                                >
                                    {p.name[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm truncate ${i === 0 ? "text-[#f5e7c8] font-semibold" : "text-[#e5dcc8]"}`}>
                                        {p.name}
                                    </p>
                                    <p className="text-[10px] text-[#a88820] tracking-[1.5px] uppercase">
                                        {p.wins} Wins
                                    </p>
                                </div>
                                <span className="font-cinzel text-sm text-[#f5e7c8]">
                                    {p.coins}
                                </span>
                            </li>
                        ))}
                    </ul>
                    
                    <Link to="/leaderboard">
                        <button className="mt-6 w-full text-center text-[11px] tracking-[3px] uppercase text-[#d4af37] border border-[#d4af37]/50 rounded-full py-3 hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300">
                            View Full Leaderboard →
                        </button>
                    </Link>
                </div>
            </section>

            {/* ============================================================
                FINAL CTA
            ============================================================ */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="relative overflow-hidden rounded-3xl border border-[#d4af37]/50 bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#050505] px-8 sm:px-16 py-16 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95),0_0_60px_rgba(212,175,55,0.15)]">
                    {/* ambient gold light */}
                    <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#d4af37]/10 blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_55%)]" />

                    <div className="relative">
                        <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                            ✦ One Tap Away ✦
                        </span>
                        <h2 className="font-cinzel text-3xl sm:text-5xl text-white tracking-widest uppercase mt-4 mb-4">
                            Ready to{" "}
                            <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent">
                                Play?
                            </span>
                        </h2>
                        <p className="text-sm sm:text-base text-[#c9c0ae] max-w-xl mx-auto mb-8">
                            Choose your game and enter the virtual casino.
                        </p>

                        <button className="group relative px-10 py-4 rounded-full text-sm font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_60px_rgba(212,175,55,0.75)] active:scale-95 overflow-hidden">
                            <span className="relative z-10">Enter Casino</span>
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </button>
                    </div>
                </div>
            </section>

            {/* FOOTER NOTE */}
            <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center text-[10px] text-[#a88820]/50 tracking-[3px] uppercase">
                Virtual Coins Only · No Real Money Gambling · Play Responsibly
            </footer>
        </div>
    )
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function StatBlock({ label, value, highlight }) {
    return (
        <div className="bg-[#0a0a0a] px-6 py-7 flex flex-col items-center justify-center text-center transition-colors duration-300 hover:bg-[#0f0f0f]">
            <p className="text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2">
                {label}
            </p>
            <p
                className={`font-cinzel text-xl sm:text-2xl ${
                    highlight ? "text-[#ffd966] drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]" : "text-[#f5e7c8]"
                }`}
            >
                {value}
            </p>
        </div>
    )
}

function SectionHeading({ kicker, title, subtitle }) {
    return (
        <div className="text-center mb-12">
            <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">{kicker}</span>
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl text-white tracking-widest uppercase mt-3 mb-3">
                {title}
            </h2>
            <p className="text-sm text-[#c9c0ae]">{subtitle}</p>
            <div className="mx-auto mt-5 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
        </div>
    )
}

function GameTile({ title, desc, cta, children }) {
    return (
        <div className="group relative bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/35 rounded-3xl p-6 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:border-[#d4af37] hover:-translate-y-2 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.95),0_0_50px_rgba(212,175,55,0.25)]">
            {/* gold hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_60%)]" />

            {/* hover shimmer sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />

            <div className="relative h-24 flex items-center justify-center mb-6">
                {children}
            </div>

            <h3 className="font-cinzel text-xl text-[#d4af37] tracking-[3px] uppercase mb-2">
                {title}
            </h3>
            <p className="text-xs text-[#c9c0ae] leading-relaxed mb-6 min-h-[36px]">
                {desc}
            </p>

            <button className="mt-auto w-full px-6 py-3 rounded-full text-[11px] font-bold tracking-[2px] uppercase text-[#d4af37] border border-[#d4af37]/60 bg-black/40 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#d4af37] group-hover:via-[#f5e7c8] group-hover:to-[#a88820] group-hover:text-[#0a0a0a] group-hover:border-[#f5e7c8] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] active:scale-95">
                {cta}
            </button>
        </div>
    )
}

function FloatingCard({ rank, suit, red, className = "", delay = "0s" }) {
    return (
        <div
            className={`absolute w-14 h-20 sm:w-16 sm:h-24 bg-gradient-to-br from-[#f5e7c8] to-[#e8d5a8] rounded-lg border-2 border-[#d4af37] shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.25)] flex flex-col items-center justify-center font-bold ${className} ${
                red ? "text-[#8b1a1a]" : "text-[#0a0a0a]"
            }`}
            style={{ animation: `float 5s ease-in-out ${delay} infinite` }}
        >
            <span className="text-lg">{rank}</span>
            <span className="text-lg">{suit}</span>
        </div>
    )
}

function MiniCard({ rank, suit, red, className = "" }) {
    return (
        <div
            className={`w-14 h-20 bg-gradient-to-br from-[#f5e7c8] to-[#e8d5a8] rounded-lg border-2 border-[#d4af37] shadow-[0_6px_18px_rgba(0,0,0,0.6)] flex flex-col items-center justify-center font-bold transition-transform duration-500 ${
                red ? "text-[#8b1a1a]" : "text-[#0a0a0a]"
            } ${className}`}
        >
            <span className="text-base">{rank}</span>
            <span className="text-base">{suit}</span>
        </div>
    )
}

/* ============================================================
   STATIC DATA
   ============================================================ */

const TOP_PLAYERS = [
    { name: "DiamondKing", wins: 198, coins: "124,500" },
    { name: "GoldRush", wins: 162, coins: "98,200" },
    { name: "AceOfSpades", wins: 141, coins: "87,900" },
    { name: "LuckyLuciano", wins: 112, coins: "65,400" },
    { name: "HighRoller77", wins: 92, coins: "52,100" },
]

export default Home