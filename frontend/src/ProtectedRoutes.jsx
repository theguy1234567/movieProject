import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";

function ProtectedRoutes({ children }) {
  const [isAuth, setAuth] = useState(null);
  const [userDetails, setUserdetails] = useState(null);
  

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
  if (isAuth === null) return <div>checking login</div>;
  if (!isAuth) return <Navigate to={"/login"} />;
  

  return children;
}

export default ProtectedRoutes;
