import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children }) {
  const [isAuth, setAuth] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/auth/current-user", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      })
      .catch(() => setAuth(false));
  }, []);
  if (isAuth === null) {
    return (
      <main className="min-h-screen px-[10px] py-[10px] text-white">
        <div className="grid w-full min-h-[calc(100vh-3rem)] place-items-center rounded-[26px] bg-[#191919]">
          <h1 className="text-3xl font-black">Checking login...</h1>
        </div>
      </main>
    );
  }
  if (!isAuth) return <Navigate to={"/login"} />;

  return children;
}

export default ProtectedRoutes;
