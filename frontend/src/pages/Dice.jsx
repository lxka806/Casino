import { useState } from "react";
import api from "../api/axios";

function Dice() {
    const [betAmount, setBetAmount] = useState("");
    const [chosenNumber, setChosenNumber] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const DICE_FACES = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];

    const playDice = async () => {
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const response = await api.post("/api/game/dice", {
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

    const diceRolled = result?.game?.diceResult;
    const diceWon =
        result &&
        diceRolled !== undefined &&
        Number(diceRolled) === Number(chosenNumber);

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ The Golden Table ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Dice
                        </span>
                    </h1>
                    <p className="text-sm text-[#c9c0ae] max-w-md mx-auto">
                        Pick your number. Roll the dice. Test your luck.
                    </p>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* ===== LEFT: DICE VISUAL + RESULT ===== */}
                    <div className="lg:col-span-2">
                        <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)] overflow-hidden">
                            {/* ambient glow */}
                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

                            <div className="relative flex flex-col items-center">
                                <span className="text-[10px] text-[#a88820] tracking-[3px] uppercase mb-6">
                                    The Roll
                                </span>

                                {/* Dice face */}
                                <div
                                    className={`w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#f5e7c8] to-[#d4af37] rounded-3xl flex items-center justify-center text-6xl sm:text-7xl font-bold text-[#0a0a0a] shadow-[0_15px_40px_rgba(0,0,0,0.7),inset_0_-6px_14px_rgba(0,0,0,0.25),0_0_60px_rgba(212,175,55,0.35)] transition-transform duration-500 ${
                                        loading
                                            ? "animate-[spin_0.4s_linear_infinite]"
                                            : "hover:rotate-[15deg]"
                                    }`}
                                >
                                    {loading
                                        ? "⚄"
                                        : diceRolled
                                        ? DICE_FACES[Number(diceRolled) - 1]
                                        : "⚀"}
                                </div>

                                {/* Chosen number indicator */}
                                {chosenNumber && !loading && (
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
                                        : diceWon
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
                                                diceWon ? "text-[#ffd966] drop-shadow-[0_0_12px_rgba(212,175,55,0.6)]" : "text-[#c9c0ae]"
                                            }`}
                                        >
                                            {diceWon ? "✦ You Won ✦" : "Better Luck Next Time"}
                                        </p>

                                        <p className="text-center text-sm text-[#f5e7c8]/80 mb-5">
                                            {result.message}
                                        </p>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Rolled
                                                </p>
                                                <p className="font-cinzel text-xl text-[#f5e7c8]">
                                                    {result.game.diceResult}
                                                </p>
                                            </div>
                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Your Credits
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

                    {/* ===== RIGHT: BET PANEL ===== */}
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

                                {/* Quick bet chips */}
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
                                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                                    {[1, 2, 3, 4, 5, 6].map((n) => {
                                        const selected = String(chosenNumber) === String(n);
                                        return (
                                            <button
                                                key={n}
                                                type="button"
                                                onClick={() => setChosenNumber(String(n))}
                                                className={`aspect-square rounded-xl border font-cinzel text-2xl transition-all duration-300 active:scale-95 ${
                                                    selected
                                                        ? "border-[#f5e7c8] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-[0_0_30px_rgba(212,175,55,0.6)]"
                                                        : "border-[#d4af37]/35 bg-[#0a0a0a] text-[#d4af37] hover:border-[#d4af37] hover:bg-[#d4af37]/5 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                                                }`}
                                            >
                                                {n}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Roll button */}
                            <button
                                onClick={playDice}
                                disabled={loading || !betAmount || !chosenNumber}
                                className="group relative w-full py-4 rounded-full text-sm font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] active:scale-[0.98] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
                            >
                                <span className="relative z-10">
                                    {loading ? "Rolling..." : "Roll Dice"}
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

export default Dice;