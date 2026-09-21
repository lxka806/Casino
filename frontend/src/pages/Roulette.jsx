import { useState } from "react";
import api from "../api/axios";

function Roulette() {
    const [betAmount, setBetAmount] = useState("");
    const [chosenNumber, setChosenNumber] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const playRoulette = async () => {
        setError("");
        setResult(null);

        if (!betAmount || !chosenNumber) {
            setError("Enter a bet and choose a number.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/api/game/roulette", {
                betAmount: Number(betAmount),
                chosenNumber: Number(chosenNumber),
            });

            setResult(response.data);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    };

    const won =
        result?.game?.result === "win" ||
        result?.game?.result === "WON" ||
        (result?.game?.amountWon ?? 0) > 0;

    // Roulette color helper for the number grid
    const getNumberColor = (n) => {
        if (n === 0) return "green";
        const reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        return reds.includes(n) ? "red" : "black";
    };

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ The Golden Wheel ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Roulette
                        </span>
                    </h1>
                    <p className="text-sm text-[#c9c0ae] max-w-md mx-auto">
                        Choose a number between 0 and 36. Spin the wheel. Trust the gold.
                    </p>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* ===== LEFT: WHEEL VISUAL + RESULT ===== */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)] overflow-hidden">
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

                            <div className="relative flex flex-col items-center">
                                <span className="text-[10px] text-[#a88820] tracking-[3px] uppercase mb-6">
                                    The Wheel
                                </span>

                                {/* Pointer */}
                                <div className="relative">
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[20px] border-l-transparent border-r-transparent border-t-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]" />

                                    {/* Wheel */}
                                    <div
                                        className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full border-[4px] border-[#d4af37] relative shadow-[0_0_50px_rgba(212,175,55,0.4),inset_0_0_40px_rgba(0,0,0,0.9)] transition-transform duration-[1400ms] ease-[cubic-bezier(0.15,0.9,0.25,1)]`}
                                        style={{
                                            background:
                                                "conic-gradient(#d4af37 0deg 30deg,#1a1a1a 30deg 60deg,#d4af37 60deg 90deg,#1a1a1a 90deg 120deg,#d4af37 120deg 150deg,#1a1a1a 150deg 180deg,#d4af37 180deg 210deg,#1a1a1a 210deg 240deg,#d4af37 240deg 270deg,#1a1a1a 270deg 300deg,#d4af37 300deg 330deg,#1a1a1a 330deg 360deg)",
                                            animation: loading
                                                ? "spin 0.6s linear infinite"
                                                : "none",
                                        }}
                                    >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-[#0a0a0a] border-[3px] border-[#d4af37] rounded-full shadow-[inset_0_0_15px_rgba(0,0,0,0.9),0_0_25px_rgba(212,175,55,0.5)] flex items-center justify-center">
                                            <span className="font-cinzel text-[10px] text-[#d4af37] tracking-widest">
                                                36
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {chosenNumber !== "" && !loading && (
                                    <div className="mt-6 text-[11px] tracking-[2px] uppercase text-[#a88820]">
                                        Your pick ·{" "}
                                        <span className="text-[#d4af37] font-cinzel text-sm">
                                            {chosenNumber}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ===== RESULT PANEL ===== */}
                        {(result || error) && (
                            <div
                                className={`mt-6 rounded-3xl border p-6 animate-[fadeUp_0.5s_ease-out] ${
                                    error
                                        ? "border-red-500/40 bg-red-500/5"
                                        : won
                                        ? "border-[#d4af37] bg-gradient-to-br from-[#d4af37]/[0.12] to-transparent shadow-[0_0_40px_rgba(212,175,55,0.25)]"
                                        : "border-[#d4af37]/25 bg-black/40"
                                }`}
                            >
                                {error && (
                                    <p className="text-center text-sm text-red-400/90">
                                        {error}
                                    </p>
                                )}

                                {result && (
                                    <>
                                        <p
                                            className={`text-center font-cinzel text-lg tracking-widest uppercase mb-4 ${
                                                won
                                                    ? "text-[#ffd966] drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                                                    : "text-[#c9c0ae]"
                                            }`}
                                        >
                                            {won ? "✦ You Won ✦" : "Better Luck Next Time"}
                                        </p>

                                        <p className="text-center text-sm text-[#f5e7c8]/80 mb-5">
                                            {result.message}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Winning
                                                </p>
                                                <p className="font-cinzel text-xl text-[#f5e7c8]">
                                                    {result.game.rouletteResult}
                                                </p>
                                            </div>
                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Your Pick
                                                </p>
                                                <p className="font-cinzel text-xl text-[#f5e7c8]">
                                                    {result.game.chosenNumber}
                                                </p>
                                            </div>
                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Amount Won
                                                </p>
                                                <p className="font-cinzel text-xl text-[#ffd966] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                                                    {result.game.amountWon}
                                                </p>
                                            </div>
                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Credits
                                                </p>
                                                <p className="font-cinzel text-xl text-[#ffd966] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                                                    {result.user.credits?.toLocaleString?.() ??
                                                        result.user.credits}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ===== RIGHT: BET + NUMBER GRID ===== */}
                    <div className="lg:col-span-3">
                        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">

                            <h2 className="font-cinzel text-xl text-[#d4af37] tracking-widest uppercase mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                                Place Your Bet
                            </h2>

                            {/* Bet amount */}
                            <div className="mb-6">
                                <label className="block text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2">
                                    Bet Amount
                                </label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={betAmount}
                                    onChange={(e) => setBetAmount(e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/40 rounded-xl px-5 py-3.5 text-[#f5e7c8] placeholder:text-[#a88820]/50 focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300"
                                />

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {[50, 100, 250, 500, 1000].map((v) => (
                                        <button
                                            key={v}
                                            type="button"
                                            onClick={() => setBetAmount(String(v))}
                                            className="px-4 py-1.5 rounded-full text-[11px] font-cinzel tracking-widest text-[#d4af37] border border-[#d4af37]/40 bg-black/40 transition-all duration-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37] hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] active:scale-95"
                                        >
                                            +{v}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Choose number */}
                            <div className="mb-8">
                                <label className="block text-[10px] text-[#a88820] tracking-[3px] uppercase mb-3">
                                    Choose Your Number
                                </label>
                                {/* 0 highlighted first */}
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setChosenNumber(0)}
                                        className={`w-full sm:w-24 py-3 rounded-xl font-cinzel text-lg transition-all duration-300 active:scale-95 border ${
                                            Number(chosenNumber) === 0
                                                ? "border-[#f5e7c8] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                                                : "border-[#d4af37]/40 bg-[#0a0a0a] text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/5 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                        }`}
                                    >
                                        0
                                    </button>
                                </div>

                                {/* 1–36 grid */}
                                <div className="grid grid-cols-6 sm:grid-cols-9 lg:grid-cols-12 gap-1.5">
                                    {Array.from({ length: 36 }, (_, i) => i + 1).map((n) => {
                                        const selected = Number(chosenNumber) === n;
                                        const color = getNumberColor(n);
                                        return (
                                            <button
                                                key={n}
                                                type="button"
                                                onClick={() => setChosenNumber(n)}
                                                className={`aspect-square rounded-lg font-cinzel text-sm transition-all duration-300 active:scale-95 border ${
                                                    selected
                                                        ? "border-[#f5e7c8] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-[0_0_25px_rgba(212,175,55,0.6)]"
                                                        : color === "red"
                                                        ? "border-[#8b1a1a]/60 bg-[#1a0a0a] text-[#e8a8a8] hover:border-[#d4af37] hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                                        : "border-[#d4af37]/25 bg-[#0a0a0a] text-[#f5e7c8]/80 hover:border-[#d4af37] hover:bg-[#d4af37]/5 hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                                }`}
                                            >
                                                {n}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Spin button */}
                            <button
                                onClick={playRoulette}
                                disabled={loading || !betAmount || chosenNumber === ""}
                                className="group relative w-full py-4 rounded-full text-sm font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] active:scale-[0.98] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
                            >
                                <span className="relative z-10">
                                    {loading ? "Spinning..." : "Spin the Wheel"}
                                </span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            </button>

                            <p className="mt-4 text-center text-[10px] text-[#a88820]/60 tracking-[2px] uppercase">
                                Virtual Coins Only · Play Responsibly
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Roulette;