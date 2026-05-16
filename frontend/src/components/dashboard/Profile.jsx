import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  const initial = user?.username?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="min-h-screen px-[10px] pb-[10px] text-white">
      <div className="w-full min-h-[calc(100vh-7rem)] rounded-b-[26px] bg-[#191919] px-7 py-10 text-white md:px-16">
        {/* Page heading */}
        <div className="mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-accent/80">
            Account
          </p>
          <h1 className="text-5xl font-black tracking-tight">Profile</h1>
        </div>

        {!user ? (
          <div className="flex items-center gap-3 text-white/50">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-accent" />
            <span className="text-sm font-semibold">Loading profile…</span>
          </div>
        ) : (
          <div className="max-w-2xl animate-fade-in">
            {/* Profile card */}
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8">
              {/* Avatar + Name */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-3xl font-black text-black ring-2 ring-accent/60 ring-offset-2 ring-offset-[#191919]">
                    {initial}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 block h-4 w-4 rounded-full border-2 border-[#191919] bg-green-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    {user.username}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-white/50">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-white/[0.07]" />

              {/* Stats grid */}
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Email Status
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className={`block h-2 w-2 rounded-full ${
                        user.isEmailVerified ? "bg-green-400" : "bg-white/30"
                      }`}
                    />
                    <p className="text-base font-black">
                      {user.isEmailVerified ? "Verified" : "Not verified"}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Member Since
                  </p>
                  <p className="mt-2 text-base font-black">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.04] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Last Updated
                  </p>
                  <p className="mt-2 text-base font-black">
                    {new Date(user.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-white/[0.07]" />

              {/* Logout */}
              <button
                onClick={logoutUser}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-6 py-2.5 text-sm font-black text-white transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
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
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
