import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPass] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: Email,
          username: Username,
          password: Password,
        }),
      });
      const data = await res.json();
      setSuccess(
        typeof data.message === "string"
          ? data.message
          : JSON.stringify(data.message),
      );
      navigate("/login");
    } catch (error) {
      console.log("failed", error);
      setSuccess("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-[10px] py-[10px] text-white">
      <section className="relative w-full grid min-h-[calc(100vh-3rem)] overflow-hidden rounded-[26px] bg-[#191919] md:grid-cols-[0.9fr_1.1fr]">
        {/* Backdrop */}
        <img
          src="https://image.tmdb.org/t/p/original/6ELCZlTA5lGUops70hKdB83WJxH.jpg"
          alt="Movie backdrop"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/58" />

        {/* Left panel — Form */}
        <div className="relative z-10 flex items-center p-6 md:p-12">
          <form
            className="w-full rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-10"
            onSubmit={handleRegister}
          >
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur transition-all duration-200 hover:border-white/35 hover:bg-white/18"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Home
            </Link>

            <h1 className="text-3xl font-black tracking-tight">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-white/55">
              Join MovieVault for free.
            </p>

            <label className="mt-8 block">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                Email
              </span>
              <input
                className="mt-2 w-full rounded-full border border-white/10 bg-white/12 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35 transition-colors duration-200 hover:border-white/20 hover:bg-white/15"
                type="email"
                placeholder="you@example.com"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                Username
              </span>
              <input
                className="mt-2 w-full rounded-full border border-white/10 bg-white/12 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35 transition-colors duration-200 hover:border-white/20 hover:bg-white/15"
                type="text"
                placeholder="Choose a username"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                Password
              </span>
              <input
                className="mt-2 w-full rounded-full border border-white/10 bg-white/12 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/35 transition-colors duration-200 hover:border-white/20 hover:bg-white/15"
                type="password"
                placeholder="Create a strong password"
                value={Password}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-black text-black shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Creating account…
                </>
              ) : (
                "Sign Up Free"
              )}
            </button>

            {success && (
              <p className="mt-5 rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm font-semibold text-white/85">
                {success}
              </p>
            )}

            <p className="mt-7 text-sm text-white/50">
              Already registered?{" "}
              <Link
                to="/login"
                className="font-black text-white transition-colors duration-200 hover:text-accent"
              >
                Sign in →
              </Link>
            </p>
          </form>
        </div>

        {/* Right panel */}
        <div className="relative z-10 hidden flex-col justify-end p-10 md:flex">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-2">
              <span className="block h-5 w-1 rounded-full bg-accent" />
              <span className="text-xs font-bold uppercase tracking-widest text-accent/90">
                Free forever
              </span>
            </div>
            <h2 className="text-6xl font-black leading-tight tracking-tight">
              Build Your
              <br />
              Watchlist.
            </h2>
            <p className="mt-5 max-w-sm text-base font-medium leading-7 text-white/65">
              Save the movies you want to watch next and never lose track of
              great films.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
