import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
    FaSpinner,
    FaSkull,
    FaTrophy,
    FaCoins,
    FaCrown,
    FaMedal,
    FaGamepad,
    FaChartLine,
} from "react-icons/fa";

function Leaderboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getLeaderboard = async () => {
            try {
                const response = await api.get("/api/users/leaderboard");
                setUsers(response.data.leaderboard);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Could not load leaderboard."
                );
            } finally {
                setLoading(false);
            }
        };

        getLeaderboard();
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
                        Loading Leaderboard
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

    /* ===== TOP 3 PODIUM ===== */
    const top3 = users.slice(0, 3);
    const rest = users.slice(3);

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ Hall of Fame ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Leaderboard
                        </span>
                    </h1>
                    <p className="text-sm text-[#c9c0ae] max-w-md mx-auto">
                        The finest players in the house — ranked by gold.
                    </p>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                {/* ===== EMPTY ===== */}
                {users.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        {/* ===== PODIUM ===== */}
                        {top3.length > 0 && (
                            <section className="mb-10">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">

                                    {/* 2nd place */}
                                    {top3[1] && (
                                        <PodiumCard
                                            user={top3[1]}
                                            rank={2}
                                            medal={<FaMedal />}
                                        />
                                    )}

                                    {/* 1st place — bigger */}
                                    {top3[0] && (
                                        <PodiumCard
                                            user={top3[0]}
                                            rank={1}
                                            medal={<FaCrown />}
                                            champion
                                        />
                                    )}

                                    {/* 3rd place */}
                                    {top3[2] && (
                                        <PodiumCard
                                            user={top3[2]}
                                            rank={3}
                                            medal={<FaMedal />}
                                        />
                                    )}
                                </div>
                            </section>
                        )}

                        {/* ===== FULL TABLE ===== */}
                        <section className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-4 sm:p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">

                            <div className="flex items-center justify-between mb-5 px-2">
                                <h2 className="font-cinzel text-lg text-[#d4af37] tracking-widest uppercase flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                                    All Players
                                </h2>
                                <span className="text-[10px] text-[#a88820] tracking-[2px] uppercase">
                                    {users.length} Entries
                                </span>
                            </div>

                            {/* Table header */}
                            <div className="hidden sm:grid grid-cols-12 gap-3 px-4 py-3 text-[10px] text-[#a88820] tracking-[2px] uppercase border-b border-[#d4af37]/20">
                                <div className="col-span-1 text-center">Rank</div>
                                <div className="col-span-5">Player</div>
                                <div className="col-span-2 text-center">Games</div>
                                <div className="col-span-2 text-center">Wins</div>
                                <div className="col-span-2 text-right">Credits</div>
                            </div>

                            {/* Table rows */}
                            <div className="divide-y divide-[#d4af37]/10">
                                {users.map((user, index) => (
                                    <LeaderboardRow
                                        key={user._id || index}
                                        user={user}
                                        rank={index + 1}
                                    />
                                ))}
                            </div>
                        </section>
                    </>
                )}

            </div>
        </div>
    );
}

/* ============================================================
   PODIUM CARD (Top 3)
   ============================================================ */

function PodiumCard({ user, rank, medal, champion }) {
    const rankStyles = {
        1: {
            ring: "border-[#d4af37]",
            glow: "shadow-[0_0_60px_rgba(212,175,55,0.5)]",
            bg: "from-[#d4af37]/[0.18] via-[#d4af37]/[0.06] to-transparent",
            medalColor: "text-[#ffd966]",
            nameColor: "text-[#ffd966]",
            scale: "sm:scale-105",
            height: "min-h-[260px]",
        },
        2: {
            ring: "border-[#c0c0c0]/60",
            glow: "shadow-[0_0_30px_rgba(192,192,192,0.15)]",
            bg: "from-[#c0c0c0]/[0.08] to-transparent",
            medalColor: "text-[#c0c0c0]",
            nameColor: "text-[#f5e7c8]",
            scale: "",
            height: "min-h-[230px]",
        },
        3: {
            ring: "border-[#cd7f32]/60",
            glow: "shadow-[0_0_30px_rgba(205,127,50,0.15)]",
            bg: "from-[#cd7f32]/[0.08] to-transparent",
            medalColor: "text-[#cd7f32]",
            nameColor: "text-[#f5e7c8]",
            scale: "",
            height: "min-h-[230px]",
        },
    };

    const s = rankStyles[rank] || rankStyles[2];

    return (
        <div
            className={`group relative overflow-hidden rounded-3xl border ${s.ring} ${s.glow} ${s.scale} bg-gradient-to-br ${s.bg} from-[#0f0f0f] to-[#141414] p-6 text-center transition-all duration-500 hover:-translate-y-1`}
        >
            {/* ambient glow */}
            <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className={`relative flex flex-col items-center justify-center h-full ${s.height}`}>

                {/* Medal icon */}
                <div
                    className={`mb-4 text-3xl ${s.medalColor} drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]`}
                >
                    {medal}
                </div>

                {/* Avatar */}
                <div
                    className={`w-20 h-20 rounded-full p-[3px] border-2 ${s.ring} bg-[#0a0a0a] flex items-center justify-center font-cinzel text-3xl ${s.nameColor} mb-3`}
                >
                    {user.username?.[0]?.toUpperCase() || "?"}
                </div>

                {/* Username */}
                <h3
                    className={`font-cinzel text-lg sm:text-xl tracking-wider uppercase truncate max-w-full px-2 ${s.nameColor}`}
                >
                    {user.username || "Player"}
                </h3>

                <p className="text-[10px] text-[#a88820] tracking-[3px] uppercase mt-1 mb-4">
                    Rank #{rank}
                </p>

                {/* Stats */}
                <div className="w-full grid grid-cols-2 gap-2 mt-auto">
                    <div className="rounded-xl bg-black/40 border border-[#d4af37]/20 py-2">
                        <p className="text-[9px] text-[#a88820] tracking-[2px] uppercase mb-0.5">
                            Wins
                        </p>
                        <p className="font-cinzel text-base text-[#f5e7c8]">
                            {user.wins ?? 0}
                        </p>
                    </div>
                    <div className="rounded-xl bg-black/40 border border-[#d4af37]/20 py-2">
                        <p className="text-[9px] text-[#a88820] tracking-[2px] uppercase mb-0.5">
                            Credits
                        </p>
                        <p className="font-cinzel text-base text-[#ffd966] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                            {user.credits?.toLocaleString?.() ?? user.credits ?? 0}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ============================================================
   LEADERBOARD ROW
   ============================================================ */

function LeaderboardRow({ user, rank }) {
    const isTop3 = rank <= 3;

    const medalMeta =
        rank === 1
            ? { icon: "🥇", color: "text-[#ffd966]" }
            : rank === 2
            ? { icon: "🥈", color: "text-[#c0c0c0]" }
            : rank === 3
            ? { icon: "🥉", color: "text-[#cd7f32]" }
            : { icon: `#${rank}`, color: "text-[#a88820]" };

    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-12 gap-3 px-4 py-4 items-center transition-all duration-300 hover:bg-[#d4af37]/[0.05] border-l-2 ${
                isTop3
                    ? "border-l-[#d4af37]/60"
                    : "border-l-transparent hover:border-l-[#d4af37]/60"
            }`}
        >
            {/* Rank */}
            <div className="sm:col-span-1 flex items-center sm:justify-center gap-2">
                <span className="sm:hidden text-[10px] text-[#a88820] tracking-[2px] uppercase">
                    Rank
                </span>
                <span
                    className={`font-cinzel text-lg ${medalMeta.color} ${
                        rank === 1
                            ? "drop-shadow-[0_0_10px_rgba(212,175,55,0.6)]"
                            : ""
                    }`}
                >
                    {medalMeta.icon}
                </span>
            </div>

            {/* Player */}
            <div className="sm:col-span-5 flex items-center gap-3 min-w-0">
                <div
                    className={`shrink-0 w-10 h-10 rounded-full border flex items-center justify-center font-cinzel text-sm ${
                        rank === 1
                            ? "bg-gradient-to-br from-[#d4af37] to-[#a88820] text-[#0a0a0a] border-[#f5e7c8]"
                            : "bg-[#0a0a0a] text-[#d4af37] border-[#d4af37]/40"
                    }`}
                >
                    {user.username?.[0]?.toUpperCase() || "?"}
                </div>
                <div className="min-w-0">
                    <p
                        className={`truncate font-medium ${
                            rank === 1 ? "text-[#ffd966]" : "text-[#f5e7c8]"
                        }`}
                    >
                        {user.username || "Player"}
                    </p>
                    <p className="text-[10px] text-[#a88820] tracking-[2px] uppercase">
                        Rank #{rank}
                    </p>
                </div>
            </div>

            {/* Games */}
            <div className="sm:col-span-2 flex items-center sm:justify-center justify-between gap-2">
                <span className="sm:hidden text-[10px] text-[#a88820] tracking-[2px] uppercase">
                    Games
                </span>
                <span className="font-cinzel text-base text-[#f5e7c8]">
                    {user.gamesPlayed ?? 0}
                </span>
            </div>

            {/* Wins */}
            <div className="sm:col-span-2 flex items-center sm:justify-center justify-between gap-2">
                <span className="sm:hidden text-[10px] text-[#a88820] tracking-[2px] uppercase">
                    Wins
                </span>
                <span className="font-cinzel text-base text-[#f5e7c8]">
                    {user.wins ?? 0}
                </span>
            </div>

            {/* Credits */}
            <div className="sm:col-span-2 flex items-center sm:justify-end justify-between gap-2">
                <span className="sm:hidden text-[10px] text-[#a88820] tracking-[2px] uppercase">
                    Credits
                </span>
                <span
                    className={`font-cinzel text-base ${
                        rank === 1
                            ? "text-[#ffd966] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                            : "text-[#f5e7c8]"
                    }`}
                >
                    {user.credits?.toLocaleString?.() ?? user.credits ?? 0}
                </span>
            </div>
        </div>
    );
}

/* ============================================================
   EMPTY STATE
   ============================================================ */

function EmptyState() {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] border border-[#d4af37]/40 rounded-3xl p-12 text-center shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-[#d4af37]/10 blur-3xl" />

            <div className="relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-2 border-[#d4af37]/40 bg-[#d4af37]/5 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                    <FaTrophy className="text-2xl text-[#d4af37]" />
                </div>

                <h2 className="font-cinzel text-2xl text-[#d4af37] tracking-widest uppercase mb-3">
                    No Players Yet
                </h2>
                <p className="text-sm text-[#c9c0ae] max-w-sm mx-auto mb-8">
                    The leaderboard is empty. Be the first to claim the throne.
                </p>

                <Link
                    to="/games"
                    className="group relative inline-block px-8 py-3.5 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-300 overflow-hidden"
                >
                    <span className="relative z-10">Start Playing</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
            </div>
        </div>
    );
}

export default Leaderboard;