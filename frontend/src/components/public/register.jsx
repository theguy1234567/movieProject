import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [Email, setEmail] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPass] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // console.log(Email);
    // console.log(Username);
    // console.log(Password);

    const PostData = {
      email: Email,
      username: Username,
      password: Password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(PostData),
      });
      let data = await res.json();

      console.log(data);
      console.log(data.message);

      setSuccess(JSON.stringify(data.message));
      navigate("/Login");
    } catch (error) {
      console.log("failed", error);
      setSuccess("something went wrong !");
    }
  };

  return (
    <>
      <div className="h-screen   flex justify-center items-center">
        <div className=" bg-blue-200 rounded-2xl h-180 w-250 flex flex-row justify-between  ">
          <div className="w-3/4  pt-30  p-5 ">
            <h1 className="text-center text-5xl font-bold m-5">
              Hello,Friend!
            </h1>
            <form
              className="flex flex-col items-center"
              onSubmit={handleRegister}
            >
              <input
                className="bg-amber-50 mt-5 w-full p-2 rounded-md shadow-2xl"
                type="text"
                placeholder="email"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                className="bg-amber-50 mt-5 w-full p-2 rounded-md shadow-2xl"
                type="text"
                placeholder="username"
                value={Username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input
                className="bg-amber-50 mt-5 p-2 rounded-md shadow-2xl w-full"
                type="text"
                placeholder="password"
                value={Password}
                onChange={(e) => {
                  setPass(e.target.value);
                }}
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
                Create Account
              </button>

              <div className="bg-white text-center w-fit mt-5 p-2 rounded-md">
                <h1 className="text-green-400">{success}</h1>
              </div>
            </form>
          </div>
          <div className="bg-sky-200 w-1/2 rounded-2xl shadow-xl/10 flex flex-col justify-center items-center">
            <h1 className="text-4xl text-shadow-md font-extralight">
              Register to get started!
            </h1>
            <h2>This is the start of a new journey</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
