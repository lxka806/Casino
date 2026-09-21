import { useState } from "react";
import api from "../api/axios";

import {
    FaStar,
    FaBell,
    FaGem,
    FaLemon,
    FaCoins,
    FaFire,
} from "react-icons/fa";
import { IoDice } from "react-icons/io5";
import { CiApple } from "react-icons/ci";

const SYMBOL_DATA = {
    star: { Icon: FaStar, color: "#ffd966" },
    bell: { Icon: FaBell, color: "#d4af37" },
    gem: { Icon: FaGem, color: "#d4af37" },
    apple: { Icon: CiApple, color: "#e04040" },
    lemon: { Icon: FaLemon, color: "#e8d54a" },
};

const FALLBACK = {
    Icon: FaStar,
    color: "#d4af37",
};

const SYMBOLS = ["apple", "gem", "star"];

const SYMBOL_LEGEND = [
    { symbol: "star", Icon: FaStar, color: "#ffd966" },
    { symbol: "bell", Icon: FaBell, color: "#d4af37" },
    { symbol: "gem", Icon: FaGem, color: "#d4af37" },
    { symbol: "apple", Icon: CiApple, color: "#e04040" },
    { symbol: "lemon", Icon: FaLemon, color: "#e8d54a" },
];

function resolveSymbol(symbol) {
    if (!symbol) {
        return FALLBACK;
    }

    const normalized = String(symbol).trim().toLowerCase();

    return SYMBOL_DATA[normalized] || FALLBACK;
}
function Slots() {
    const [betAmount, setBetAmount] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const playSlots = async () => {
        setError("");
        setResult(null);

        const amount = Number(betAmount);

        if (!betAmount) {
            setError("Enter a bet amount.");
            return;
        }

        if (!Number.isFinite(amount) || amount <= 0) {
            setError("Bet amount must be greater than 0.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/api/game/slots", {
                betAmount: amount,
            });

            console.log("Slots API response:", response.data);

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

    const spinArr = result?.game?.spin;

    const symbolsMatch =
        Array.isArray(spinArr) &&
        spinArr.length >= 3 &&
        String(spinArr[0]).toLowerCase() ===
            String(spinArr[1]).toLowerCase() &&
        String(spinArr[1]).toLowerCase() ===
            String(spinArr[2]).toLowerCase();

    const apiResult = String(
        result?.game?.result ?? ""
    ).toLowerCase();

    const apiSaysWin =
        apiResult === "win" ||
        apiResult === "won" ||
        apiResult === "winner";

    const amountWon = Number(
        result?.game?.amountWon ?? 0
    );

    const gotPaid = amountWon > 0;

    const won =
        result &&
        (symbolsMatch || apiSaysWin || gotPaid);

    const displayedSymbols =
        Array.isArray(spinArr) && spinArr.length >= 3
            ? spinArr.slice(0, 3)
            : SYMBOLS;

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* HEADER */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ The Golden Reels ✦
                    </span>

                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Slots
                        </span>
                    </h1>

                    <p className="text-sm text-[#c9c0ae] max-w-md mx-auto">
                        Spin the reels and match the symbols.
                    </p>

                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-3">

                        {/* SLOT MACHINE */}
                        <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)] overflow-hidden min-h-[400px]">

                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

                            <div className="relative flex flex-col items-center justify-center h-full">

                                <span className="text-[10px] text-[#a88820] tracking-[3px] uppercase mb-6">
                                    {loading
                                        ? "Spinning..."
                                        : result
                                        ? "Result"
                                        : "Ready to Spin"}
                                </span>

                                {/* MACHINE */}
                                <div className="relative w-full max-w-md">

                                    <div className="h-3 w-full rounded-t-2xl bg-gradient-to-r from-[#a88820] via-[#f5e7c8] to-[#a88820] shadow-[0_0_25px_rgba(212,175,55,0.5)]" />

                                    <div className="bg-gradient-to-b from-[#0a0a0a] to-[#050505] border-x-4 border-[#d4af37] px-6 py-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]">

                                        <div className="flex gap-3 sm:gap-4 justify-center">
                                            {displayedSymbols.map(
                                                (symbol, index) => (
                                                    <Reel
                                                        key={index}
                                                        symbol={symbol}
                                                        spinning={loading}
                                                        delay={index * 0.15}
                                                        won={won && !loading}
                                                    />
                                                )
                                            )}
                                        </div>

                                    </div>

                                    <div className="h-3 w-full rounded-b-2xl bg-gradient-to-r from-[#a88820] via-[#f5e7c8] to-[#a88820] shadow-[0_0_25px_rgba(212,175,55,0.5)]" />

                                    <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-3 h-20 rounded-full bg-[#d4af37]/40 blur-md" />

                                    <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-3 h-20 rounded-full bg-[#d4af37]/40 blur-md" />
                                </div>

                                {won && !loading && (
                                    <div className="mt-6 flex items-center gap-2 text-[11px] tracking-[3px] uppercase text-[#ffd966]">
                                        <span className="w-1.5 h-1.5 bg-[#ffd966] rounded-full animate-pulse" />
                                        Winning Line
                                        <span className="w-1.5 h-1.5 bg-[#ffd966] rounded-full animate-pulse" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RESULT PANEL */}
                        {(result || error) && (
                            <div
                                className={`mt-6 rounded-3xl border p-6 ${
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
                                            {won
                                                ? "✦ Jackpot! ✦"
                                                : "Better Luck Next Time"}
                                        </p>

                                        <p className="text-center text-sm text-[#f5e7c8]/80 mb-5">
                                            {result.message}
                                        </p>

                                        <div className="grid grid-cols-3 gap-3">

                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Result
                                                </p>

                                                <p className="font-cinzel text-sm text-[#f5e7c8] uppercase">
                                                    {won ? "WIN" : "LOSS"}
                                                </p>
                                            </div>

                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Amount Won
                                                </p>

                                                <p className="font-cinzel text-xl text-[#ffd966]">
                                                    {result.game?.amountWon ?? 0}
                                                </p>
                                            </div>

                                            <div className="bg-[#0a0a0a] border border-[#d4af37]/25 rounded-xl p-3 text-center">
                                                <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase mb-1">
                                                    Credits
                                                </p>

                                                <p className="font-cinzel text-xl text-[#ffd966]">
                                                    {result.user?.credits != null
                                                        ? Number(
                                                              result.user.credits
                                                          ).toLocaleString()
                                                        : "-"}
                                                </p>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="lg:col-span-2">

                        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">

                            <h2 className="font-cinzel text-xl text-[#d4af37] tracking-widest uppercase mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                                Place Your Bet
                            </h2>

                            {/* BET INPUT */}
                            <div className="mb-6">

                                <label className="block text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2">
                                    Bet Amount
                                </label>

                                <div className="relative">

                                    <FaCoins className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" />

                                    <input
                                        type="number"
                                        min="1"
                                        placeholder="Enter amount"
                                        value={betAmount}
                                        onChange={(e) =>
                                            setBetAmount(e.target.value)
                                        }
                                        className="w-full bg-[#0a0a0a] border border-[#d4af37]/40 rounded-xl pl-11 pr-5 py-3.5 text-[#f5e7c8] placeholder:text-[#a88820]/50 focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {[50, 100, 250, 500, 1000].map(
                                        (value) => (
                                            <button
                                                key={value}
                                                type="button"
                                                onClick={() =>
                                                    setBetAmount(
                                                        String(value)
                                                    )
                                                }
                                                className="px-4 py-1.5 rounded-full text-[11px] font-cinzel tracking-widest text-[#d4af37] border border-[#d4af37]/40 bg-black/40 transition-all duration-300 hover:bg-[#d4af37]/10 hover:border-[#d4af37] active:scale-95"
                                            >
                                                +{value}
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* SYMBOLS */}
                            <div className="mb-8 bg-[#0a0a0a] border border-[#d4af37]/25 rounded-2xl p-5">

                                <h3 className="font-cinzel text-sm text-[#a88820] tracking-[3px] uppercase mb-3">
                                    Symbols
                                </h3>

                                <div className="grid grid-cols-3 gap-3">
                                    {SYMBOL_LEGEND.map(
                                        ({
                                            symbol,
                                            Icon,
                                            color,
                                        }) => (
                                            <div
                                                key={symbol}
                                                className="flex items-center justify-center py-2.5 rounded-lg bg-[#0f0f0f] border border-[#d4af37]/20 text-2xl"
                                                style={{ color }}
                                            >
                                                <Icon />
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* SPIN BUTTON */}
                            <button
                                onClick={playSlots}
                                disabled={loading || !betAmount}
                                className="group relative w-full py-4 rounded-full text-sm font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] active:scale-[0.98] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">

                                    {loading ? (
                                        <>
                                            <FaFire className="animate-pulse" />
                                            Spinning...
                                        </>
                                    ) : (
                                        <>
                                            <IoDice />
                                            Spin the Reels
                                        </>
                                    )}

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

/* ============================================================
   REEL
   ============================================================ */

function Reel({
    symbol,
    spinning,
    delay = 0,
    won,
}) {
    const { Icon, color } = resolveSymbol(symbol);

    return (
        <div
            className={`relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                won
                    ? "border-[#ffd966] shadow-[0_0_35px_rgba(212,175,55,0.7),inset_0_0_25px_rgba(212,175,55,0.2)]"
                    : "border-[#d4af37]/60 shadow-[inset_0_0_25px_rgba(0,0,0,0.9),0_0_20px_rgba(212,175,55,0.15)]"
            } bg-gradient-to-b from-[#0a0a0a] via-[#141414] to-[#0a0a0a]`}
        >
            <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />

            <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />

            <div className="absolute inset-0 flex items-center justify-center">

                {spinning ? (
                    <div
                        className="flex flex-col items-center"
                        style={{
                            animation: "reelSpin 0.35s linear infinite",
                            animationDelay: `${delay}s`,
                        }}
                    >
                        {SYMBOLS.map((spinSymbol, index) => {
                            const {
                                Icon: SpinIcon,
                                color: spinColor,
                            } = resolveSymbol(spinSymbol);

                            return (
                                <div
                                    key={index}
                                    className="py-1 text-3xl sm:text-4xl opacity-90"
                                    style={{
                                        color: spinColor,
                                    }}
                                >
                                    <SpinIcon />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div
                        className={`text-4xl sm:text-5xl transition-transform duration-500 ${
                            won ? "scale-110" : ""
                        }`}
                        style={{ color }}
                    >
                        <Icon />
                    </div>
                )}
            </div>

            {won && !spinning && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-[#ffd966] to-transparent shadow-[0_0_10px_rgba(255,217,102,0.9)]" />
            )}
        </div>
    );
}

export default Slots;