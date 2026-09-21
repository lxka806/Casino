import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
    FaSpinner,
    FaSkull,
    FaTrophy,
    FaCoins,
    FaHistory,
    FaCalendarAlt,
    FaGamepad,
    FaDotCircle,
} from "react-icons/fa";
import { GiRollingDices, GiCardAceSpades, GiCherry } from "react-icons/gi";

function History() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getHistory = async () => {
            try {
                const response = await api.get("/api/game/history");
                setHistory(response.data.history);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Could not load your history."
                );
            } finally {
                setLoading(false);
            }
        };

        getHistory();
    }, []);

    /* ===== LOADING ===== */
    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-5">
                    <div className="relative">
                        <FaSpinner className="text-4xl text-[#d4af37] animate-spin" />
                        <div className="absolute inset-0 blur-xl bg-[#d4af37]/40 animate-pulse" />
                    </div>
                    <p className="font-cinzel text-sm tracking-[4px] uppercase text-[#a88820]">
                        Loading History
                    </p>
                </div>
            </div>
        );
    }

    /* ===== ERROR ===== */
    if (error) {
        return (
            <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-red-500/40 rounded-3xl p-8 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full border-2 border-red-500/40 bg-red-500/5 flex items-center justify-center">
                        <FaSkull className="text-2xl text-red-400" />
                    </div>
                    <h2 className="font-cinzel text-xl text-red-400 tracking-widest uppercase mb-3">
                        Could Not Load
                    </h2>
                    <p className="text-sm text-[#c9c0ae] mb-6">{error}</p>
                    <Link
                        to="/dashboard"
                        className="inline-block px-8 py-3 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-300"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    /* ===== DERIVED STATS ===== */
    const totalGames = history.length;
    const totalWins = history.filter(
        (g) =>
            String(g.result ?? "").toLowerCase() === "win" ||
            (g.amountWon ?? 0) > 0
    ).length;
    const totalWon = history.reduce(
        (sum, g) => sum + Number(g.amountWon ?? 0),
        0
    );

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ Your Records ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            History
                        </span>
                    </h1>
                    <p className="text-sm text-[#c9c0ae] max-w-md mx-auto">
                        Every hand, spin and roll — captured in gold.
                    </p>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                {/* ===== SUMMARY STATS ===== */}
                {history.length > 0 && (
                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                        <SummaryCard
                            icon={<FaHistory />}
                            label="Total Games"
                            value={totalGames}
                        />
                        <SummaryCard
                            icon={<FaTrophy />}
                            label="Total Wins"
                            value={totalWins}
                            positive
                        />
                        <SummaryCard
                            icon={<FaCoins />}
                            label="Total Won"
                            value={totalWon.toLocaleString()}
                            highlight
                        />
                    </section>
                )}

                {/* ===== HISTORY LIST ===== */}
                {history.length === 0 ? (
                    <EmptyState />
                ) : (
                    <section className="space-y-4">
                        {history.map((game, idx) => (
                            <HistoryRow key={game._id || idx} game={game} />
                        ))}
                    </section>
                )}

            </div>
        </div>
    );
}

/* ============================================================
   HISTORY ROW
   ============================================================ */

function HistoryRow({ game }) {
    const resultLower = String(game.result ?? "").toLowerCase();
    const isWin =
        resultLower === "win" ||
        resultLower === "won" ||
        (game.amountWon ?? 0) > 0;

    const { Icon: GameIcon, color: gameColor, label: gameLabel } =
        getGameMeta(game.game);

    const formattedDate = (() => {
        try {
            return new Date(game.createdAt).toLocaleString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            });
        } catch {
            return "—";
        }
    })();

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[#0f0f0f] to-[#141414] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] ${
                isWin
                    ? "border-[#d4af37]/60 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                    : "border-[#d4af37]/20"
            } hover:border-[#d4af37]/80`}
        >
            {/* Left accent stripe */}
            <div
                className={`absolute inset-y-0 left-0 w-1 ${
                    isWin
                        ? "bg-gradient-to-b from-[#f5e7c8] via-[#d4af37] to-[#a88820]"
                        : "bg-gradient-to-b from-[#333] to-[#111]"
                }`}
            />

            {/* Ambient win glow */}
            {isWin && (
                <div className="pointer-events-none absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#d4af37]/10 blur-3xl" />
            )}

            <div className="relative flex flex-wrap items-center gap-5">

                {/* Game icon */}
                <div
                    className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center border ${
                        isWin
                            ? "border-[#d4af37]/60 bg-[#d4af37]/10 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            : "border-[#d4af37]/25 bg-[#0a0a0a]"
                    }`}
                >
                    <GameIcon className="text-xl" style={{ color: gameColor }} />
                </div>

                {/* Main info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                        <h3 className="font-cinzel text-lg text-[#f5e7c8] tracking-wider uppercase">
                            {gameLabel}
                        </h3>

                        <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-cinzel tracking-[2px] uppercase border ${
                                isWin
                                    ? "border-[#d4af37] bg-[#d4af37]/15 text-[#ffd966]"
                                    : "border-red-500/40 bg-red-500/5 text-red-400/90"
                            }`}
                        >
                            {isWin ? (
                                <>
                                    <FaTrophy className="text-[8px]" />
                                    Win
                                </>
                            ) : (
                                <>
                                    <FaSkull className="text-[8px]" />
                                    Loss
                                </>
                            )}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#a88820] tracking-[2px] uppercase">
                        <FaCalendarAlt className="text-[10px]" />
                        {formattedDate}
                    </div>
                </div>

                {/* Numeric columns */}
                <div className="flex items-center gap-6 sm:gap-8">
                    <StatColumn
                        label="Bet"
                        value={
                            game.betAmount?.toLocaleString?.() ??
                            game.betAmount ??
                            "—"
                        }
                    />
                    <StatColumn
                        label="Won"
                        value={
                            game.amountWon?.toLocaleString?.() ??
                            game.amountWon ??
                            0
                        }
                        highlight={isWin}
                    />
                    <StatColumn
                        label="Balance"
                        value={
                            game.creditsAfter?.toLocaleString?.() ??
                            game.creditsAfter ??
                            "—"
                        }
                    />
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function StatColumn({ label, value, highlight }) {
    return (
        <div className="text-right min-w-[64px]">
            <p className="text-[9px] text-[#a88820] tracking-[2px] uppercase mb-1">
                {label}
            </p>
            <p
                className={`font-cinzel text-base sm:text-lg ${
                    highlight
                        ? "text-[#ffd966] drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]"
                        : "text-[#f5e7c8]"
                }`}
            >
                {value}
            </p>
        </div>
    );
}

function SummaryCard({ icon, label, value, positive, highlight }) {
    const iconColor = positive ? "text-[#ffd966]" : "text-[#d4af37]";
    const valueColor = highlight
        ? "text-[#ffd966] drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
        : "text-[#f5e7c8]";

    return (
        <div className="group bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4af37]/70 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)]">
            <div
                className={`mb-3 text-lg ${iconColor} transition-transform duration-300 group-hover:scale-110`}
            >
                {icon}
            </div>
            <p className="text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2">
                {label}
            </p>
            <p className={`font-cinzel text-2xl sm:text-3xl ${valueColor}`}>
                {value}
            </p>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] border border-[#d4af37]/40 rounded-3xl p-12 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#d4af37]/40 bg-[#d4af37]/5 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    <FaGamepad className="text-2xl text-[#d4af37]" />
                </div>

                <h2 className="font-cinzel text-2xl text-[#d4af37] tracking-widest uppercase mb-3">
                    No Games Yet
                </h2>
                <p className="text-sm text-[#c9c0ae] max-w-sm mx-auto mb-8">
                    Your history is empty. Take a seat at any of our tables and start
                    building your legacy.
                </p>

                <Link
                    to="/games"
                    className="group relative inline-block px-8 py-3.5 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-300 overflow-hidden"
                >
                    <span className="relative z-10">Play a Game</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
            </div>
        </div>
    );
}

/* ============================================================
   HELPERS
   ============================================================ */

function getGameMeta(gameName) {
    const key = String(gameName ?? "").toLowerCase();

    if (key.includes("dice"))
        return { Icon: GiRollingDices, color: "#d4af37", label: "Dice" };
    if (key.includes("roulette"))
        return { Icon: FaDotCircle, color: "#ffd966", label: "Roulette" };
    if (key.includes("blackjack"))
        return { Icon: GiCardAceSpades, color: "#f5e7c8", label: "Blackjack" };
    if (key.includes("slot"))
        return { Icon: GiCherry, color: "#e04040", label: "Slots" };

    return { Icon: FaGamepad, color: "#d4af37", label: gameName || "Game" };
}

export default History;