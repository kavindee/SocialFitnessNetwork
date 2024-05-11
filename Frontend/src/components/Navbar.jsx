import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <div className="bg-black flex w-full h-[70px] z-50 items-center justify-center">
  <div className="flex items-center justify-between w-full px-4">
    <div className="flex items-center w-full justify-center">
      <div className="text-orange-800 text-2xl font-bold">
        Social Fitness
      </div>
    </div>
    <div className="flex items-center ml-6">
    </div>
   
  </div>
</div>

  );
};
export default Navbar;
