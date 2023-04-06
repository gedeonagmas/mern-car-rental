import React from "react";

const PageNotFound = () => {
  return (
    <div className="top-0 absolute flex bg-gray-100 flex-col items-center justify-center w-[100%] h-[100vh] left-0">
      <img src="./error2.jpg" className="w-[60%] h-[60%] rounded-sm" />
      <p className="text-5xl font-bold">oops!</p>
      <p className="text-4xl font-extrabold mt-4">pages not found</p>
    </div>
  );
};

export default PageNotFound;
