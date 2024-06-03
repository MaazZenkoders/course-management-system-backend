"use client";
import { deleteCookie } from "cookies-next";
import React, { useEffect, useState } from "react";



const StudentNavbar: React.FC = () => {
  const handleLogout = async () => {
    deleteCookie("accessToken")
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-300 py-1 px-4 flex justify-between items-center h-12">
      <h1 className="text-lg font-semibold text-black">STUDENT DASHBOARD</h1>
      <div className="flex-grow flex justify-center space-x-4 font-sans">
      </div>
      <button
        onClick={handleLogout}
        className="text-white bg-black hover:text-black p-1.5 rounded-md hover:bg-white font-sans"
      >
        LOGOUT
      </button>
    </nav>
  );
};

export default StudentNavbar;
