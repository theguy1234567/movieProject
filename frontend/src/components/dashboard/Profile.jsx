import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // 🔥 Logout function
  const logoutUser = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:3000/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      // Clear context
      setUser(null);

      // Redirect to login
      navigate("/login");
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  // Prevent crash if user not loaded yet
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[450px]">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>

        <hr className="mb-6" />

        {/* Profile Details */}
        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Email Verified:</span>
            <span
              className={
                user.isEmailVerified ? "text-green-600" : "text-red-500"
              }
            >
              {user.isEmailVerified ? "Verified ✅" : "Not Verified ❌"}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Account Created:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">Last Updated:</span>
            <span>{new Date(user.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logoutUser}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
