import { Link } from "react-router-dom";

function Game() {
    const games = [
        {
            name: "Dice",
            description: "Roll the dice and try your luck.",
            path: "/games/dice",
            icon: "⚄",
            tag: "Casual · 2x–5x",
            preview: <DicePreview />,
        },
        {
            name: "Roulette",
            description: "Choose a number from 0 to 36.",
            path: "/games/roulette",
            icon: "🎡",
            tag: "Classic · 2x",
            preview: <RoulettePreview />,
        },
        {
            name: "Blackjack",
            description: "Play against the dealer.",
            path: "/games/blackjack",
            icon: "🃏",
            tag: "Strategy · 2x",
            preview: <BlackjackPreview />,
        },
        {
            name: "Slots",
            description: "Spin the reels and match symbols.",
            path: "/games/slots",
            icon: "🎰",
            tag: "Jackpot · 10x",
            preview: <SlotsPreview />,
        },
    ];

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-14">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ The Tables ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl text-white tracking-widest uppercase mt-3 mb-4">
                        All{" "}
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Games
                        </span>
                    </h1>
                    <p className="text-sm text-[#c9c0ae] max-w-lg mx-auto">
                        Four premium tables. One legendary lounge. Choose your game and take a seat.
                    </p>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                {/* ===== GAMES GRID ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {games.map((game) => (
                        <Link
                            key={game.name}
                            to={game.path}
                            className="group relative block bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/35 rounded-3xl p-7 overflow-hidden transition-all duration-500 hover:border-[#d4af37] hover:-translate-y-2 hover:shadow-[0_25px_60px_-20px_rgba(0,0,0,0.95),0_0_50px_rgba(212,175,55,0.25)]"
                        >
                            {/* Gold hover glow */}
                            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.15),transparent_60%)]" />

                            {/* Shimmer sweep on hover */}
                            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#d4af37]/10 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />

                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 blur-2xl rounded-full pointer-events-none" />

                            <div className="relative flex items-start gap-6">

                                {/* Visual preview */}
                                <div className="shrink-0 w-28 h-28 rounded-2xl bg-[#0a0a0a] border border-[#d4af37]/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.9)] group-hover:border-[#d4af37]/70 transition-colors duration-500">
                                    {game.preview}
                                </div>

                                {/* Text + CTA */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="font-cinzel text-2xl text-[#d4af37] tracking-[3px] uppercase">
                                            {game.name}
                                        </h2>
                                        <span className="text-[9px] tracking-[2px] uppercase text-[#a88820] border border-[#d4af37]/30 rounded-full px-2.5 py-1">
                                            {game.tag}
                                        </span>
                                    </div>

                                    <p className="text-sm text-[#c9c0ae] leading-relaxed mb-5">
                                        {game.description}
                                    </p>

                                    <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-bold tracking-[2px] uppercase text-[#d4af37] border border-[#d4af37]/60 bg-black/40 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#d4af37] group-hover:via-[#f5e7c8] group-hover:to-[#a88820] group-hover:text-[#0a0a0a] group-hover:border-[#f5e7c8] group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                                        Play
                                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                                            →
                                        </span>
                                    </span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>

                {/* ===== FOOTER NOTE ===== */}
                <footer className="mt-16 text-center text-[10px] text-[#a88820]/50 tracking-[3px] uppercase">
                    Virtual Coins Only · No Real Money Gambling · Play Responsibly
                </footer>
            </div>
        </div>
    );
}

/* ============================================================
   GAME PREVIEWS (small animated visuals per card)
   ============================================================ */

function DicePreview() {
    return (
        <div className="w-16 h-16 bg-gradient-to-br from-[#f5e7c8] to-[#d4af37] rounded-xl flex items-center justify-center text-3xl font-bold text-[#0a0a0a] shadow-[0_8px_20px_rgba(0,0,0,0.6),inset_0_-4px_8px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:rotate-[25deg] group-hover:scale-110">
            ⚂
        </div>
    );
}

function RoulettePreview() {
    return (
        <div
            className="w-16 h-16 rounded-full border-[3px] border-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.5),inset_0_0_15px_rgba(0,0,0,0.8)] transition-transform duration-[1400ms] group-hover:rotate-[180deg]"
            style={{
                background:
                    "conic-gradient(#d4af37 0deg 30deg,#1a1a1a 30deg 60deg,#d4af37 60deg 90deg,#1a1a1a 90deg 120deg,#d4af37 120deg 150deg,#1a1a1a 150deg 180deg,#d4af37 180deg 210deg,#1a1a1a 210deg 240deg,#d4af37 240deg 270deg,#1a1a1a 270deg 300deg,#d4af37 300deg 330deg,#1a1a1a 330deg 360deg)",
            }}
        >
            <div className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#0a0a0a] border-2 border-[#d4af37] rounded-full" />
        </div>
    );
}

function BlackjackPreview() {
    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute -rotate-[14deg] -translate-x-2 w-10 h-14 bg-gradient-to-br from-[#f5e7c8] to-[#e8d5a8] rounded-md border-2 border-[#d4af37] flex flex-col items-center justify-center font-bold text-[#0a0a0a] shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:-translate-x-3 group-hover:-rotate-[20deg]">
                <span className="text-xs">A</span>
                <span className="text-xs">♠</span>
            </div>
            <div className="absolute rotate-[10deg] translate-x-2 w-10 h-14 bg-gradient-to-br from-[#f5e7c8] to-[#e8d5a8] rounded-md border-2 border-[#d4af37] flex flex-col items-center justify-center font-bold text-[#8b1a1a] shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:translate-x-3 group-hover:rotate-[20deg]">
                <span className="text-xs">K</span>
                <span className="text-xs">♥</span>
            </div>
        </div>
    );
}

function SlotsPreview() {
    return (
        <div className="flex gap-1">
            {["🍒", "💎", "7️⃣"].map((s, i) => (
                <div
                    key={i}
                    className="w-6 h-10 bg-[#0a0a0a] border border-[#d4af37] rounded-md flex items-center justify-center text-sm text-[#d4af37] shadow-[inset_0_0_10px_rgba(0,0,0,0.9)] transition-transform duration-500"
                    style={{ transitionDelay: `${i * 80}ms` }}
                >
                    <span className="group-hover:-translate-y-1 transition-transform duration-500" style={{ transitionDelay: `${i * 80}ms` }}>
                        {s}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Game;