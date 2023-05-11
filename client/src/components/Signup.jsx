import React, { useState } from "react";
import { useUserRegisterMutation } from "./../features/api/apiSlice";

const Signup = () => {
  const [registerData, registerResponse] = useUserRegisterMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const submit = () => {
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("email", email);
    form.append("address", address);
    form.append("phone", phone);
    form.append("password", password);
    form.append("confirmPassword", confirmPassword);
    form.append("profilePic", profilePic);
    registerData(form);
  };
  registerResponse && console.log(registerResponse, "rrrrrr");
  return (
    <div className="flex h-[90vh] w-[100%] items-center justify-center">
      <div className="flex relative flex-col mt-52 items-center justify-center bg-white w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] h-[90%]">
        <p className="text-3xl font-extrabold flex items-center justify-center text-gray-500 py-5 px-4 w-[90%] uppercase">
          Your Personnel Information
        </p>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          className="h-16 text-lg font-bold mt-6 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="text"
          placeholder="first name"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          className="h-16 text-lg font-bold mt-2 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="text"
          placeholder="last name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="h-16 text-lg font-bold mt-2 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="text"
          placeholder="email"
        />
        <input
          onChange={(e) => setAddress(e.target.value)}
          className="h-16 text-lg font-bold mt-2 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="text"
          placeholder="address"
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          className="h-16 text-lg font-bold mt-2 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="text"
          placeholder="phone number"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="h-16 text-lg font-bold mt-2 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="password"
          placeholder="password"
        />
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="h-16 text-lg font-bold mt-2 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="password"
          placeholder="confirm password"
        />{" "}
        <p className="h-16 text-lg font-bold mt-4 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500">
          choose profile picture {"("}optional {")"}
        </p>
        <input
          onChange={(e) => setProfilePic(e.target.files[0])}
          className="absolute bottom-20 flex items-center bg-red-400 h-16 text-lg font-bold mt-1 opacity-0 w-[90%] px-2 py-1 border border-gray-400 focus:outline-gray-500"
          type="file"
          name="profilePic"
          id=""
        />
        <button
          onClick={submit}
          className="h-14 rounded-sm text-xl hover:text-gray-200 mt-3 w-[90%] px-6 bg-[#ff4d30] text-white font-extrabold"
        >
          Register
        </button>
      </div>
      {registerResponse?.data?.message && (
        <div className="absolute shadow-xl shadow-emerald-500 z-30 top-72 right-10 border bg-white px-2 py-2 h-auto w-auto border-emerald-500 text-emerald-500 font-bold text-lg">
          {registerResponse.data.message}
        </div>
      )}
      {registerResponse?.status === "rejected" && (
        <div className="absolute shadow-xl shadow-[#ff4d30] z-30 top-72 right-10 border bg-white px-2 py-2 h-auto w-auto border-[#ff4d30] text-[#ff4d30] font-bold text-lg">
          {registerResponse.error !== undefined ? (
            registerResponse.error?.data.map((e) => {
              return <p>{e.msg}</p>;
            })
          ) : (
            <p>something went wrong</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Signup;
