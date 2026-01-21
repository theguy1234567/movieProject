import React from "react";

function Dashboard() {
  const username = localStorage.getItem("username");

  const logoutUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/v1/auth/logout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    let data = await res.json();

    console.log(data);
  };

  return (
    <>
      <h1 className="text-6xl text-red-500 font-extrabold">
        welcome {username}!
      </h1>
      <button className="bg-amber-200 p-5 rounded-2xl" onClick={logoutUser}>
        logout
      </button>
    </>
  );
}
export default Dashboard;
