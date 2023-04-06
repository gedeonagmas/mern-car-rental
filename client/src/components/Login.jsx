import React, { useEffect, useState } from "react";
import { useUserLoginMutation } from "../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, loginResponse] = useUserLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pop, setPop] = useState(true);

  const submit = () => {
    loginData({ email, password });
  };

  console.log(loginResponse, "RRRRR");
  const homeHandler = () => {
    navigate("/", { replace: true });
  };
  useEffect(() => {
    if (loginResponse?.status === "fulfilled") {
      localStorage.setItem("jwt", loginResponse.data.token);
      localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
    }
    const detail = localStorage.getItem("jwt");
    if (detail) {
      navigate("/", { replace: true });
    }
  }, [loginResponse]);

  return (
    <div className="flex h-[100vh] overflow-hidden w-[100%]  bg-white  items-center justify-center">
      <div onClick={homeHandler} className="absolute z-20 bg-transparent backdrop-blur-lg backdrop-brightness-50 w-[100%] h-[100%] left-0"></div>
      <Hero />
      <div className="absolute z-30 flex-col items-center justify-center bg-transparent w-auto h-auto">
        <p className="text-3xl font-extrabold flex items-center justify-center text-white py-5 px-4 uppercase">Log in</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="h-16 text-lg font-bold rounded-sm mt-6 w-[100%] text-center text-black bg-white px-2 py-1 border-2 border-white focus:outline-gray-100"
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="h-16 text-lg rounded-sm font-bold mt-6 w-[100%] text-center text-black bg-white px-2 py-1 border-2 border-white focus:outline-gray-100"
          type="password"
          placeholder="password"
        />
        <button onClick={submit} className="h-14 rounded-sm text-xl hover:text-gray-300 mt-3 w-[100%] px-6 bg-[#ff4d30] text-white font-extrabold">
          Login
        </button>
        {loginResponse?.status === "rejected" && (
          <div className="shadow-xl flex items-center justify-center shadow-[#ff4d30] mt-7 border bg-white px-2 py-4 h-auto w-auto border-[#ff4d30] text-[#ff4d30] font-bold text-xl">
            {loginResponse.error?.data.msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
