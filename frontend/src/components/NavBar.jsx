import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getProfile, logoutUser } from "../api/auth";
import {
    FaBars,
    FaTimes,
    FaHome,
    FaGamepad,
    FaTachometerAlt,
    FaHistory,
    FaTrophy,
    FaUser,
    FaSignOutAlt,
    FaSignInAlt,
    FaUserPlus,
    FaCoins,
} from "react-icons/fa";

function NavBar() {
    const [user, setUser] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getProfile();
                setUser(data.user || data);
            } catch (error) {
                setUser(null);
            }
        };

        checkAuth();
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Lock body scroll when mobile menu open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
            setMobileOpen(false);
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const navItems = [
        { to: "/", label: "Home", icon: <FaHome /> },
        { to: "/games", label: "Games", icon: <FaGamepad /> },
        { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
        { to: "/history", label: "History", icon: <FaHistory /> },
        { to: "/leaderboard", label: "Leaderboard", icon: <FaTrophy /> },
    ];

    const isActive = (path) =>
        location.pathname === path ||
        (path !== "/" && location.pathname.startsWith(path));

    /* ===== DESKTOP LINK CLASS ===== */
    const linkClass =
        "relative px-3 py-2 text-xs tracking-[2px] uppercase transition-colors duration-200 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[1px] after:bg-[#d4af37] after:transition-all after:duration-300";

    const desktopLink = (active) =>
        `${linkClass} ${
            active
                ? "text-[#d4af37] after:w-3/4"
                : "text-[#b8a88a] hover:text-[#d4af37] after:w-0 hover:after:w-3/4"
        }`;

    /* ===== MOBILE LINK CLASS ===== */
    const mobileLink = (active) =>
        `flex items-center gap-4 px-5 py-3.5 rounded-xl text-sm tracking-[2px] uppercase transition-all duration-200 border ${
            active
                ? "border-[#d4af37]/60 bg-[#d4af37]/10 text-[#ffd966]"
                : "border-transparent text-[#b8a88a] hover:text-[#d4af37] hover:bg-[#d4af37]/[0.06] hover:border-[#d4af37]/30"
        }`;

    return (
        <nav className="sticky top-0 z-50 w-full bg-[#0a0a0a]/85 backdrop-blur-md border-b border-[#d4af37]/40 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8),0_0_15px_rgba(212,175,55,0.1)]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* ===== BRAND ===== */}
                    <Link
                        to="/"
                        className="font-cinzel text-xl sm:text-2xl text-[#d4af37] tracking-widest uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] hover:drop-shadow-[0_0_20px_rgba(212,175,55,0.9)] transition-all duration-300 shrink-0"
                    >
                        Casino
                    </Link>

                    {/* ===== DESKTOP NAV ===== */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={desktopLink(isActive(item.to))}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {user ? (
                            <>
                                {/* Balance chip */}
                                {user.credits != null && (
                                    <div className="ml-3 hidden xl:flex items-center gap-2 bg-[#0f0f0f] border border-[#d4af37]/50 rounded-full px-4 py-1.5 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)]">
                                        <FaCoins className="text-[#d4af37] text-xs" />
                                        <span className="font-cinzel text-sm text-[#ffd966]">
                                            {user.credits?.toLocaleString?.() ??
                                                user.credits}
                                        </span>
                                    </div>
                                )}

                                <Link
                                    to="/profile"
                                    className="ml-3 flex items-center gap-2 px-4 py-2 text-xs tracking-[2px] uppercase rounded-full border border-[#d4af37]/60 text-[#f5e7c8] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                                >
                                    <FaUser className="text-[10px]" />
                                    {user.username || "Profile"}
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="ml-1 flex items-center gap-2 px-4 py-2 text-xs tracking-[2px] uppercase font-semibold rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-lg shadow-[#d4af37]/30 hover:scale-[1.03] hover:shadow-[#d4af37]/60 active:scale-95 transition-all duration-200"
                                >
                                    <FaSignOutAlt className="text-[10px]" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="ml-3 flex items-center gap-2 px-4 py-2 text-xs tracking-[2px] uppercase rounded-full border border-[#d4af37]/60 text-[#f5e7c8] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                                >
                                    <FaSignInAlt className="text-[10px]" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="ml-1 flex items-center gap-2 px-4 py-2 text-xs tracking-[2px] uppercase font-semibold rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-lg shadow-[#d4af37]/30 hover:scale-[1.03] hover:shadow-[#d4af37]/60 active:scale-95 transition-all duration-200"
                                >
                                    <FaUserPlus className="text-[10px]" />
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* ===== TABLET: condensed auth only ===== */}
                    <div className="hidden md:flex lg:hidden items-center gap-2">
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="flex items-center gap-2 px-3.5 py-2 text-[11px] tracking-[2px] uppercase rounded-full border border-[#d4af37]/60 text-[#f5e7c8] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                                >
                                    <FaUser className="text-[10px]" />
                                    {user.username || "Profile"}
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-lg shadow-[#d4af37]/30 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                                    aria-label="Logout"
                                >
                                    <FaSignOutAlt className="text-xs" />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-3.5 py-2 text-[11px] tracking-[2px] uppercase rounded-full border border-[#d4af37]/60 text-[#f5e7c8] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-3.5 py-2 text-[11px] tracking-[2px] uppercase font-semibold rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-lg shadow-[#d4af37]/30 hover:scale-[1.03] active:scale-95 transition-all duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* ===== MOBILE HAMBURGER ===== */}
                    <button
                        onClick={() => setMobileOpen((v) => !v)}
                        className="md:hidden relative w-10 h-10 rounded-full border border-[#d4af37]/60 bg-[#0f0f0f] text-[#d4af37] flex items-center justify-center hover:border-[#d4af37] hover:bg-[#d4af37]/10 active:scale-95 transition-all duration-200"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                    >
                        {mobileOpen ? (
                            <FaTimes className="text-sm" />
                        ) : (
                            <FaBars className="text-sm" />
                        )}
                    </button>
                </div>
            </div>

            {/* ===== MOBILE DRAWER ===== */}
            {/* Backdrop */}
            <div
                onClick={() => setMobileOpen(false)}
                className={`md:hidden fixed inset-0 top-16 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
                    mobileOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Panel */}
            <div
                className={`md:hidden fixed top-16 left-0 right-0 z-50 origin-top transition-all duration-300 ${
                    mobileOpen
                        ? "opacity-100 scale-y-100 pointer-events-auto"
                        : "opacity-0 scale-y-95 pointer-events-none"
                }`}
            >
                <div className="mx-4 mt-3 mb-4 bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/50 rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.15)] overflow-hidden">

                    {/* User card at top (if logged in) */}
                    {user && (
                        <div className="p-5 border-b border-[#d4af37]/15">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] p-[2px] shrink-0">
                                    <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center font-cinzel text-lg text-[#d4af37]">
                                        {user.username?.[0]?.toUpperCase() || "?"}
                                    </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-cinzel text-base text-[#f5e7c8] truncate">
                                        {user.username || "Player"}
                                    </p>
                                    {user.credits != null && (
                                        <p className="flex items-center gap-1.5 text-xs text-[#ffd966] mt-0.5">
                                            <FaCoins className="text-[10px] text-[#d4af37]" />
                                            {user.credits?.toLocaleString?.() ??
                                                user.credits}{" "}
                                            credits
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Nav links */}
                    <div className="p-3 space-y-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={mobileLink(isActive(item.to))}
                            >
                                <span className="text-base">{item.icon}</span>
                                <span className="font-cinzel tracking-wider">
                                    {item.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Auth actions */}
                    <div className="p-3 pt-0 border-t border-[#d4af37]/15 mt-1">
                        {user ? (
                            <div className="pt-3 space-y-2">
                                <Link
                                    to="/profile"
                                    className={mobileLink(isActive("/profile"))}
                                >
                                    <FaUser className="text-base" />
                                    <span className="font-cinzel tracking-wider">
                                        Profile
                                    </span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold tracking-[2px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-lg shadow-[#d4af37]/30 hover:shadow-[#d4af37]/60 active:scale-[0.98] transition-all duration-200"
                                >
                                    <FaSignOutAlt />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="pt-3 grid grid-cols-2 gap-2">
                                <Link
                                    to="/login"
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs tracking-[2px] uppercase rounded-full border border-[#d4af37]/60 text-[#f5e7c8] hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all duration-200"
                                >
                                    <FaSignInAlt className="text-[10px]" />
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs tracking-[2px] uppercase font-semibold rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] text-[#0a0a0a] shadow-lg shadow-[#d4af37]/30 active:scale-[0.98] transition-all duration-200"
                                >
                                    <FaUserPlus className="text-[10px]" />
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;