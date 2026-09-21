import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getProfile, logoutUser } from "../api/auth";
import {
    FaSpinner,
    FaSkull,
    FaUser,
    FaEnvelope,
    FaCoins,
    FaCrown,
    FaSignOutAlt,
    FaTrophy,
    FaGamepad,
    FaUserShield,
} from "react-icons/fa";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const data = await getProfile();
                setUser(data.user || data);
            } catch (error) {
                setError(
                    error.response?.data?.message || "Failed to load profile"
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

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
                        Could Not Load
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

    /* ===== MAIN PROFILE ===== */
    const isAdmin =
        String(user?.role ?? "").toLowerCase() === "admin";

    const winRate =
        user?.gamesPlayed > 0
            ? Math.round((user.wins / user.gamesPlayed) * 100)
            : 0;

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-12">
                    <span className="text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ Your Profile ✦
                    </span>
                    <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl tracking-widest uppercase mt-3 mb-4">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(212,175,55,0.35)]">
                            Account
                        </span>
                    </h1>
                    <div className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                {/* ===== HERO CARD ===== */}
                <section className="mb-8">
                    <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] via-[#141414] to-[#0a0a0a] border border-[#d4af37]/50 rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.15)]">

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
                                    <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-br from-[#d4af37] to-[#a88820] flex items-center justify-center border-2 border-[#0a0a0a] shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                                        <FaCrown className="text-sm text-[#0a0a0a]" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] text-[#a88820] tracking-[4px] uppercase">
                                    Player Identity
                                </span>
                                <h2 className="font-cinzel text-2xl sm:text-4xl text-[#f5e7c8] tracking-wider mt-1 mb-3 truncate">
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
                        </div>
                    </div>
                </section>

                {/* ===== DETAILS + STATS ===== */}
                <section className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">

                    {/* Account details */}
                    <div className="lg:col-span-3 bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
                        <h3 className="font-cinzel text-lg text-[#d4af37] tracking-widest uppercase mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#d4af37] rounded-full" />
                            Account Details
                        </h3>

                        <div className="space-y-4">
                            <DetailRow
                                icon={<FaUser />}
                                label="Username"
                                value={user?.username || "—"}
                            />
                            <DetailRow
                                icon={<FaEnvelope />}
                                label="Email"
                                value={user?.email || "—"}
                            />
                            <DetailRow
                                icon={<FaUserShield />}
                                label="Role"
                                value={user?.role || "player"}
                                highlight={isAdmin}
                            />
                        </div>
                    </div>

                    {/* Balance & stats */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {/* Balance */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/50 rounded-3xl p-6 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95),0_0_30px_rgba(212,175,55,0.15)]">
                            <div className="pointer-events-none absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#d4af37]/10 blur-2xl" />
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <FaCoins className="text-[#d4af37]" />
                                    <p className="text-[10px] text-[#a88820] tracking-[3px] uppercase">
                                        Balance
                                    </p>
                                </div>
                                <p className="font-cinzel text-3xl sm:text-4xl text-[#ffd966] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                                    {user?.credits?.toLocaleString?.() ??
                                        user?.credits ??
                                        0}
                                </p>
                            </div>
                        </div>

                        {/* Mini stat grid */}
                        <div className="grid grid-cols-3 gap-3">
                            <MiniStat
                                icon={<FaGamepad />}
                                label="Games"
                                value={user?.gamesPlayed ?? 0}
                            />
                            <MiniStat
                                icon={<FaTrophy />}
                                label="Wins"
                                value={user?.wins ?? 0}
                                positive
                            />
                            <MiniStat
                                label="Win %"
                                value={`${winRate}%`}
                                highlight
                            />
                        </div>
                    </div>
                </section>

                {/* ===== ACTIONS ===== */}
                <section className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_-25px_rgba(0,0,0,0.95)]">
                    <div className="flex flex-wrap gap-3 items-center justify-between">
                        <div>
                            <h3 className="font-cinzel text-lg text-[#d4af37] tracking-widest uppercase mb-1">
                                Session
                            </h3>
                            <p className="text-xs text-[#c9c0ae]">
                                End your session safely when you're done.
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-red-400 border border-red-500/40 bg-red-500/5 transition-all duration-300 hover:bg-red-500/10 hover:border-red-500/70 hover:shadow-[0_0_30px_rgba(220,38,38,0.25)] active:scale-95"
                        >
                            <FaSignOutAlt className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                            Log Out
                        </button>
                    </div>
                </section>

            </div>
        </div>
    );
};

/* ============================================================
   SUBCOMPONENTS
   ============================================================ */

function DetailRow({ icon, label, value, highlight }) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0a0a0a]/60 border border-[#d4af37]/20 transition-colors duration-300 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/[0.04]">
            <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${
                    highlight
                        ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#ffd966]"
                        : "border-[#d4af37]/30 bg-[#0f0f0f] text-[#d4af37]"
                }`}
            >
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#a88820] tracking-[3px] uppercase mb-0.5">
                    {label}
                </p>
                <p
                    className={`font-medium truncate ${
                        highlight ? "text-[#ffd966]" : "text-[#f5e7c8]"
                    }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

function MiniStat({ icon, label, value, positive, highlight }) {
    const valueColor = highlight
        ? "text-[#ffd966] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        : "text-[#f5e7c8]";

    return (
        <div className="bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/25 rounded-2xl p-4 text-center transition-all duration-300 hover:border-[#d4af37]/60 hover:-translate-y-0.5">
            {icon && (
                <div
                    className={`mb-1 text-sm ${
                        positive ? "text-[#ffd966]" : "text-[#d4af37]"
                    }`}
                >
                    {icon}
                </div>
            )}
            <p className="text-[9px] text-[#a88820] tracking-[2px] uppercase mb-1">
                {label}
            </p>
            <p className={`font-cinzel text-lg ${valueColor}`}>{value}</p>
        </div>
    );
}

export default Profile;