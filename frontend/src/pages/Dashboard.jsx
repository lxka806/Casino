import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import {
    FaCoins,
    FaTrophy,
    FaGamepad,
    FaChartLine,
    FaUserShield,
    FaCrown,
    FaSkull,
    FaSpinner,
} from "react-icons/fa";

function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get("/api/auth/profile");
                setUser(response.data.user);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Could not load your profile."
                );
            } finally {
                setLoading(false);
            }
        };

        getUser();
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
                        Loading Profile
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
                        Access Denied
                    </h2>
                    <p className="text-sm text-[#c9c0ae] mb-6">{error}</p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-3 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-300"
                    >
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    /* ===== MAIN DASHBOARD ===== */
    const winRate =
        user?.gamesPlayed > 0
            ? Math.round((user.wins / user.gamesPlayed) * 100)
            : 0;

    const isAdmin = user?.role === "admin" || user?.role === "ADMIN";

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ Your Private Lounge ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Dashboard
                        </span>
                    </h1>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                {/* ===== PLAYER HERO CARD ===== */}
                <section className="mb-8">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] border border-[#d4af37]/50 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.15)]">

                        {/* Ambient glows */}
                        <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#d4af37]/10 blur-3xl" />
                        <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-[#d4af37]/5 blur-3xl" />

                        <div className="relative flex flex-wrap items-center gap-8">

                            {/* Avatar */}
                            <div className="relative">
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] p-[3px] shadow-[0_0_40px_rgba(212,175,55,0.5)]">
                                    <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center font-cinzel text-4xl text-[#d4af37]">
                                        {user?.username?.[0]?.toUpperCase() || "?"}
                                    </div>
                                </div>
                                {isAdmin && (
                                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a88820] flex items-center justify-center border-2 border-[#0a0a0a] shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                                        <FaCrown className="text-xs text-[#0a0a0a]" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] text-[#a88820] tracking-[4px] uppercase">
                                    Welcome Back
                                </span>
                                <h2 className="font-cinzel text-2xl sm:text-4xl text-[#f5e7c8] tracking-wider mt-1 mb-2 truncate">
                                    {user?.username || "Player"}
                                </h2>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span
                                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-cinzel tracking-[2px] uppercase ${
                                            isAdmin
                                                ? "border-[#d4af37] bg-[#d4af37]/10 text-[#ffd966]"
                                                : "border-[#d4af37]/40 bg-black/40 text-[#d4af37]"
                                        }`}
                                    >
                                        <FaUserShield className="text-xs" />
                                        {user?.role || "player"}
                                    </span>
                                </div>
                            </div>

                            {/* Balance chip */}
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] text-[#a88820] tracking-[3px] uppercase">
                                    Current Balance
                                </span>
                                <div className="flex items-center gap-3 bg-[#0a0a0a] border border-[#d4af37] rounded-full px-6 py-3 shadow-[inset_0_0_10px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.25)]">
                                    <FaCoins className="text-[#d4af37] text-lg" />
                                    <span className="font-cinzel text-2xl sm:text-3xl text-[#ffd966] drop-shadow-[0_0_15px_rgba(212,175,55,0.7)]">
                                        {user?.credits?.toLocaleString?.() ??
                                            user?.credits ??
                                            0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== STATS GRID ===== */}
                <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                    <StatCard
                        icon={<FaGamepad />}
                        label="Games Played"
                        value={user?.gamesPlayed ?? 0}
                        accent
                    />
                    <StatCard
                        icon={<FaTrophy />}
                        label="Wins"
                        value={user?.wins ?? 0}
                        positive
                    />
                    <StatCard
                        icon={<FaSkull />}
                        label="Losses"
                        value={user?.losses ?? 0}
                        negative
                    />
                    <StatCard
                        icon={<FaChartLine />}
                        label="Win Rate"
                        value={`${winRate}%`}
                        highlight
                    />
                </section>

                {/* ===== TWO-COLUMN: PROGRESS + CTA ===== */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Win Rate Bar */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-cinzel text-lg text-[#d4af37] tracking-widest uppercase flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                                Performance
                            </h3>
                            <span className="font-cinzel text-2xl text-[#ffd966] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                                {winRate}%
                            </span>
                        </div>

                        {/* Progress bar */}
                        <div className="relative h-3 bg-[#0a0a0a] border border-[#d4af37]/30 rounded-full overflow-hidden mb-3">
                            <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#a88820] via-[#d4af37] to-[#f5e7c8] shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-[width] duration-1000 ease-out"
                                style={{ width: `${winRate}%` }}
                            />
                        </div>
                        <div className="flex justify-between text-[10px] text-[#a88820] tracking-[2px] uppercase">
                            <span>0%</span>
                            <span>100%</span>
                        </div>

                        <p className="mt-6 text-xs text-[#c9c0ae] leading-relaxed">
                            You've won{" "}
                            <span className="text-[#ffd966] font-semibold">
                                {user?.wins ?? 0}
                            </span>{" "}
                            out of{" "}
                            <span className="text-[#f5e7c8] font-semibold">
                                {user?.gamesPlayed ?? 0}
                            </span>{" "}
                            games. Keep the streak alive.
                        </p>
                    </div>

                    {/* Quick Play CTA */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] border border-[#d4af37]/50 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
                        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#d4af37]/10 blur-3xl" />

                        <div className="relative">
                            <span className="text-[10px] text-[#a88820] tracking-[4px] uppercase">
                                ✦ Next Hand ✦
                            </span>
                            <h3 className="font-cinzel text-xl text-[#d4af37] tracking-wider mt-2 mb-3">
                                Ready to Play?
                            </h3>
                            <p className="text-xs text-[#c9c0ae] leading-relaxed mb-6">
                                Pick a table and keep climbing.
                            </p>

                            <Link
                                to="/games"
                                className="group relative block w-full text-center py-3.5 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] active:scale-95 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10">Enter Casino</span>
                                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}

/* ============================================================
   STAT CARD
   ============================================================ */

function StatCard({ icon, label, value, accent, positive, negative, highlight }) {
    const iconColor = positive
        ? "text-[#ffd966]"
        : negative
        ? "text-red-400"
        : "text-[#d4af37]";

    const valueColor = highlight
        ? "text-[#ffd966] drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
        : "text-[#f5e7c8]";

    return (
        <div
            className={`group bg-gradient-to-br from-[#0f0f0f] to-[#141414] border rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8),0_0_25px_rgba(212,175,55,0.15)] ${
                accent
                    ? "border-[#d4af37]/60 shadow-[0_0_25px_rgba(212,175,55,0.1)]"
                    : "border-[#d4af37]/25"
            } hover:border-[#d4af37]/70`}
        >
            <div className={`mb-3 text-lg ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
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

export default Dashboard;