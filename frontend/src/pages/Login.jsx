import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import {
    FaEnvelope,
    FaLock,
    FaSpinner,
    FaSignInAlt,
    FaCheckCircle,
    FaExclamationTriangle,
    FaCrown,
} from "react-icons/fa";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const data = await login(formData);

            setMessage(data.message);
            console.log("Logged in user:", data.user);

            // Brief delay so the success state is visible before redirect
            setTimeout(() => navigate("/dashboard"), 900);
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Login failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] bg-[radial-gradient(circle_at_20%_0%,#141414_0%,#050505_65%)] font-inter text-white flex items-center justify-center px-4 py-14">

            {/* Background ambient gold glows */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#d4af37]/[0.06] blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#d4af37]/[0.04] blur-3xl" />
            </div>

            <div className="relative w-full max-w-md">

                {/* ===== HEADER ===== */}
                <header className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-[#d4af37]/60 bg-[#0a0a0a] mb-5 shadow-[0_0_40px_rgba(212,175,55,0.35)]">
                        <FaCrown className="text-2xl text-[#d4af37]" />
                    </div>
                    <span className="block text-[10px] text-[#a88820] tracking-[5px] uppercase">
                        ✦ Welcome Back ✦
                    </span>
                    <h1 className="font-cinzel text-3xl sm:text-4xl tracking-widest uppercase mt-3 mb-3">
                        <span className="bg-gradient-to-br from-[#f5e7c8] via-[#d4af37] to-[#a88820] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                            Sign In
                        </span>
                    </h1>
                    <p className="text-sm text-[#c9c0ae]">
                        Enter the golden lounge and continue your streak.
                    </p>
                    <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                </header>

                {/* ===== FORM CARD ===== */}
                <div className="relative bg-gradient-to-br from-[#0f0f0f] to-[#141414] border border-[#d4af37]/40 rounded-3xl p-8 shadow-[0_25px_70px_-25px_rgba(0,0,0,0.95),0_0_40px_rgba(212,175,55,0.1)]">

                    {/* inner ambient glow */}
                    <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full bg-[#d4af37]/10 blur-3xl" />

                    <form onSubmit={handleSubmit} className="relative space-y-5">

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2"
                            >
                                Email
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37] text-sm pointer-events-none" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="email"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/40 rounded-xl pl-11 pr-5 py-3.5 text-[#f5e7c8] placeholder:text-[#a88820]/50 focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-[10px] text-[#a88820] tracking-[3px] uppercase mb-2"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37] text-sm pointer-events-none" />
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                    className="w-full bg-[#0a0a0a] border border-[#d4af37]/40 rounded-xl pl-11 pr-5 py-3.5 text-[#f5e7c8] placeholder:text-[#a88820]/50 focus:outline-none focus:border-[#d4af37] focus:shadow-[0_0_25px_rgba(212,175,55,0.25)] transition-all duration-300"
                                />
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full py-4 rounded-full text-sm font-bold tracking-[3px] uppercase text-[#0a0a0a] bg-gradient-to-br from-[#d4af37] via-[#f5e7c8] to-[#a88820] shadow-[0_0_35px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] active:scale-[0.98] overflow-hidden disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_35px_rgba(212,175,55,0.4)]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? (
                                    <>
                                        <FaSpinner className="animate-spin" />
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        <FaSignInAlt />
                                        Sign In
                                    </>
                                )}
                            </span>
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </button>
                    </form>

                    {/* ===== MESSAGES ===== */}
                    {message && (
                        <div className="relative mt-5 flex items-start gap-3 p-4 rounded-2xl border border-[#d4af37]/50 bg-gradient-to-br from-[#d4af37]/[0.12] to-transparent animate-[fadeUp_0.4s_ease-out]">
                            <FaCheckCircle className="text-[#ffd966] text-sm mt-0.5 shrink-0 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                            <p className="text-xs text-[#ffd966]">{message}</p>
                        </div>
                    )}

                    {error && (
                        <div className="relative mt-5 flex items-start gap-3 p-4 rounded-2xl border border-red-500/40 bg-red-500/5 animate-[fadeUp_0.4s_ease-out]">
                            <FaExclamationTriangle className="text-red-400 text-sm mt-0.5 shrink-0" />
                            <p className="text-xs text-red-400/90">{error}</p>
                        </div>
                    )}

                    {/* ===== FOOTER LINK ===== */}
                    <div className="relative mt-8 pt-6 border-t border-[#d4af37]/15 text-center">
                        <p className="text-xs text-[#c9c0ae]">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-[#d4af37] font-medium hover:text-[#ffd966] hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                {/* ===== FOOTER NOTE ===== */}
                <p className="text-center text-[10px] text-[#a88820]/50 tracking-[3px] uppercase mt-8">
                    Virtual Coins Only · Play Responsibly
                </p>
            </div>
        </div>
    );
}

export default Login;