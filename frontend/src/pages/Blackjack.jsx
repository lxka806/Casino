import { useState } from "react";
import api from "../api/axios";

function Blackjack() {
    const [betAmount, setBetAmount] = useState("");
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const playBlackjack = async () => {
        setError("");
        setResult(null);

        if (!betAmount) {
            setError("Enter a bet amount.");
            return;
        }

        if (Number(betAmount) <= 0) {
            setError("Bet amount must be greater than 0.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/api/game/blackjack", {
                betAmount: Number(betAmount),
            });

            console.log("BLACKJACK RESPONSE:", response.data);

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

    const parseCard = (card) => {
        if (!card) {
            return {
                rank: "?",
                suit: "",
                red: false,
            };
        }

        // If backend returns:
        // { rank: "A", suit: "♠" }
        if (typeof card === "object") {
            const rank = card.rank ?? "?";
            const suit = card.suit ?? "";

            return {
                rank,
                suit,
                red: suit === "♥" || suit === "♦",
            };
        }

        const value = String(card).trim();

        // Example: A♠, 10♥, K♦
        const match = value.match(
            /^(10|[2-9]|J|Q|K|A)\s*([♠♥♦♣])?$/i
        );

        if (match) {
            const rank = match[1];
            const suit = match[2] ?? "";

            return {
                rank,
                suit,
                red: suit === "♥" || suit === "♦",
            };
        }

        return {
            rank: value,
            suit: "",
            red: false,
        };
    };

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* HEADER */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ The Dealer's Table ✦
                    </span>

                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Blackjack
                        </span>
                    </h1>

                    <p className="text-sm text-[#c9c0ae] max-w-md mx-auto">
                        Try to get closer to 21 than the dealer — without busting.
                    </p>

                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-3">

                        {/* TABLE */}
                        <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)] overflow-hidden min-h-[420px]">

                            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />

                            <div className="relative flex flex-col justify-between h-full gap-8">

                                {/* DEALER */}
                                <div className="w-full">

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] text-[#a88820] tracking-[3px] uppercase">
                                            Dealer
                                        </span>

                                        {result?.game?.dealerValue != null && (
                                            <span className="font-cinzel text-sm text-[#d4af37] border border-[#d4af37]/40 rounded-full px-3 py-1">
                                                {result.game.dealerValue}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-3 min-h-[140px] items-center flex-wrap">

                                        {loading && (
                                            <>
                                                <DealCard loading />
                                                <DealCard loading delay={0.15} />
                                            </>
                                        )}

                                        {!loading && result?.game?.dealerCards?.length > 0 ? (
                                            result.game.dealerCards.map((card, index) => {
                                                const parsed = parseCard(card);

                                                return (
                                                    <DealCard
                                                        key={index}
                                                        rank={parsed.rank}
                                                        suit={parsed.suit}
                                                        red={parsed.red}
                                                        delay={index * 0.12}
                                                    />
                                                );
                                            })
                                        ) : !loading ? (
                                            <>
                                                <PlaceholderCard />
                                                <PlaceholderCard />
                                            </>
                                        ) : null}

                                    </div>
                                </div>

                                {/* DIVIDER */}
                                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/40 to-transparent" />

                                {/* PLAYER */}
                                <div className="w-full">

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[10px] text-[#a88820] tracking-[3px] uppercase">
                                            Your Hand
                                        </span>

                                        {result?.game?.playerValue != null && (
                                            <span className="font-cinzel text-sm text-[#ffd966] border border-[#d4af37]/60 rounded-full px-3 py-1">
                                                {result.game.playerValue}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-3 min-h-[140px] items-center flex-wrap">

                                        {loading && (
                                            <>
                                                <DealCard loading />
                                                <DealCard loading delay={0.15} />
                                            </>
                                        )}

                                        {!loading && result?.game?.playerCards?.length > 0 ? (
                                            result.game.playerCards.map((card, index) => {
                                                const parsed = parseCard(card);

                                                return (
                                                    <DealCard
                                                        key={index}
                                                        rank={parsed.rank}
                                                        suit={parsed.suit}
                                                        red={parsed.red}
                                                        delay={index * 0.12}
                                                    />
                                                );
                                            })
                                        ) : !loading ? (
                                            <>
                                                <PlaceholderCard />
                                                <PlaceholderCard />
                                            </>
                                        ) : null}

                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* RESULT */}
                        {(result || error) && (
                            <div
                                className={`mt-6 rounded-3xl border p-6 ${
                                    error
                                        ? "border-red-500/40 bg-red-500/5"
                                        : won
                                        ? "border-[#d4af37] bg-[#d4af37]/10"
                                        : "border-[#d4af37]/25 bg-black/40"
                                }`}
                            >
                                {error && (
                                    <p className="text-center text-sm text-red-400">
                                        {error}
                                    </p>
                                )}

                                {result && (
                                    <>
                                        <p
                                            className={`text-center font-cinzel text-lg tracking-widest uppercase mb-4 ${
                                                won
                                                    ? "text-[#ffd966]"
                                                    : "text-[#c9c0ae]"
                                            }`}
                                        >
                                            {won
                                                ? "✦ You Won ✦"
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
                                                    {result.game?.result ?? "-"}
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
                                                    {result.user?.credits?.toLocaleString?.() ??
                                                        result.user?.credits ??
                                                        "-"}
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

                        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8">

                            <h2 className="font-cinzel text-xl text-[#d4af37] tracking-widest uppercase mb-6">
                                Place Your Bet
                            </h2>

                            <div className="mb-6">

                                <label className="block text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2">
                                    Bet Amount
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter amount"
                                    value={betAmount}
                                    onChange={(e) =>
                                        setBetAmount(e.target.value)
                                    }
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/40 rounded-xl px-5 py-3.5 text-[#f5e7c8] placeholder:text-[#a88820]/50 focus:outline-none focus:border-[#d4af37]"
                                />

                                <div className="flex flex-wrap gap-2 mt-3">
                                    {[50, 100, 250, 500, 1000].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() =>
                                                setBetAmount(String(value))
                                            }
                                            className="px-4 py-1.5 rounded-full text-[11px] font-cinzel tracking-widest text-[#d4af37] border border-[#d4af37]/40 bg-black/40 hover:bg-[#d4af37]/10"
                                        >
                                            +{value}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* RULES */}
                            <div className="mb-8 bg-[#0a0a0a] border border-[#d4af37]/25 rounded-2xl p-5">

                                <h3 className="font-cinzel text-sm text-[#a88820] tracking-[3px] uppercase mb-3">
                                    House Rules
                                </h3>

                                <ul className="space-y-2 text-xs text-[#c9c0ae]">

                                    <li>
                                        <span className="text-[#d4af37] mr-2">
                                            ✦
                                        </span>
                                        Get as close to 21 as possible.
                                    </li>

                                    <li>
                                        <span className="text-[#d4af37] mr-2">
                                            ✦
                                        </span>
                                        Beat the dealer's hand.
                                    </li>

                                    <li>
                                        <span className="text-[#d4af37] mr-2">
                                            ✦
                                        </span>
                                        Aces count as 1 or 11.
                                    </li>

                                    <li>
                                        <span className="text-[#d4af37] mr-2">
                                            ✦
                                        </span>
                                        Dealer wins ties.
                                    </li>

                                </ul>
                            </div>

                            <button
                                onClick={playBlackjack}
                                disabled={loading || !betAmount}
                                className="w-full py-4 rounded-full text-sm font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {loading ? "Dealing..." : "Play Blackjack"}
                            </button>

                            <p className="mt-4 text-center text-[10px] text-[#a88820]/60 tracking-[2px] uppercase">
                                Virtual Coins Only
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* CARD */

function DealCard({
    rank = "?",
    suit = "",
    red = false,
    loading = false,
    delay = 0,
}) {
    return (
        <div
            className={`
                relative
                w-20 h-28
                sm:w-24 sm:h-32
                rounded-xl
                bg-white
                border-2 border-[#d4af37]
                shadow-[0_8px_25px_rgba(0,0,0,0.7)]
                flex flex-col
                items-center
                justify-center
                overflow-hidden
                ${red ? "text-red-700" : "text-black"}
            `}
            style={{
                animation: `deal 0.5s ease-out ${delay}s both`,
            }}
        >
            {loading ? (
                <div className="w-8 h-8 rounded-full border-4 border-gray-300 border-t-[#d4af37] animate-spin" />
            ) : (
                <>
                    {/* TOP */}
                    <div className="absolute top-2 left-2 flex flex-col items-center leading-none">
                        <span className="text-lg font-bold">
                            {rank}
                        </span>

                        <span className="text-base">
                            {suit}
                        </span>
                    </div>

                    {/* CENTER */}
                    <span className="text-5xl font-bold">
                        {suit}
                    </span>

                    {/* BOTTOM */}
                    <div className="absolute bottom-2 right-2 flex flex-col items-center leading-none rotate-180">
                        <span className="text-lg font-bold">
                            {rank}
                        </span>

                        <span className="text-base">
                            {suit}
                        </span>
                    </div>
                </>
            )}
        </div>
    );
}

/* EMPTY CARD */

function PlaceholderCard() {
    return (
        <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-xl border-2 border-dashed border-[#d4af37]/30 bg-[#0a0a0a]/60 flex items-center justify-center">
            <span className="text-[#d4af37]/30 text-3xl">
                ?
            </span>
        </div>
    );
}

export default Blackjack;