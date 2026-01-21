import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    console.log("loogin cliccked");
    console.log("loogin cliccked");
    console.log(email);
    console.log(password);

    const postData = {
      email: email,
      password: password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      let data = await res.json();

      console.log(data);
      const message = data.message;

      console.log(message);
      if (res.ok) {
        setSuccess(message);
        localStorage.setItem("username", data.data.user.username);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("failed", error);
      setSuccess("something went wrong!");
    }
  };

  return (
    <>
      <>
        <div className="h-screen   flex justify-center items-center">
          <div className=" bg-blue-200 rounded-2xl h-180 w-250 flex flex-row justify-between  ">
            <div className="bg-sky-200 w-1/2 rounded-2xl shadow-xl/10 flex flex-col justify-center items-center">
              <h1 className="text-3xl text-shadow-md font-extralight">
                Login in with your Account
              </h1>
              <h2>This is the start of a new journey</h2>
            </div>
            <div className="w-3/4  pt-30  p-5 ">
              <h1 className="text-center text-5xl font-bold m-5">
                Login to get started
              </h1>
              <form
                className="flex flex-col items-center"
                onSubmit={handlelogin}
              >
                <input
                  className="bg-amber-50 mt-5 w-full p-2 rounded-md shadow-2xl"
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="bg-amber-50 mt-5 p-2 rounded-md shadow-2xl w-full"
                  type="text"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="flex items-center gap-2 mt-3  text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-blue-500 cursor-pointer"
                  />
                  <span>Agree to terms and conditions</span>
                </label>
                <button
                  type="submit"
                  className="bg-amber-50 p-3 mt-10 rounded-2xl w-50 shadow-2xl "
                >
                  LogIn
                </button>

                <div className="bg-white text-center w-fit mt-5 p-2 rounded-md">
                  <h1 className="text-green-400">{success}</h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
export default Login;
