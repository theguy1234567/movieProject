import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="bg-amber-200 h-auto p-5 flex items-center justify-center rounded-b-2xl shadow-md">
        <div className=" w-[70%] flex justify-between">
          <div className="flex gap-20 items-center m-2">
            <Link to={"/dashboard/main"}>
              <h1 className="text-2xl hover:bg-amber-300 rounded-2xl">
                The movie web
              </h1>
            </Link>

            <Link
              to="/dashboard/movies"
              className="text-2xl hover:bg-amber-300 rounded-2xl"
            >
              Movies
            </Link>

            <Link
              to="/dashboard/watchlist"
              className="text-2xl hover:bg-amber-300 rounded-2xl"
            >
              Watchlist
            </Link>

            <Link
              to="/dashboard/profile"
              className="text-2xl hover:bg-amber-300 rounded-2xl"
            >
              Profile
            </Link>
          </div>

          <div className="profils ">
            <Link to="/dashboard/profile">
              <button className="bg-amber-500 rounded-full h-10 w-10 m-2">
                G
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
