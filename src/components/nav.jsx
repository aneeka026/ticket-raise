import React, { useState } from "react";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaCog
} from "react-icons/fa";
import { FiUser, FiBell, FiSettings } from 'react-icons/fi';
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = ({ setSidebarOpen }) => {
  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-2 sticky top-0 z-50">

      <div className="flex items-center gap-4">
        <FaBars
          className="cursor-pointer text-[#4D4C7D]"
          onClick={() => setSidebarOpen(prev => !prev)
            
          }
        />

        <div className="flex items-center gap-2">
          <div className="bg-[#4D4C7D] text-white font-bold w-8 h-8 flex items-center justify-center rounded-md">
            T
          </div>
          <span className="font-bold text-[#4D4C7D] text-lg">
            Ticket Management System
          </span>
        </div>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative  hidden md:block ">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 pl-10 pr-4 py-1.5 rounded-md
          bg-[#f4f4ff] text-xs text-[#4D4C7D] 
            border border-[#8a89d7]
            focus:outline-none focus:bg-[#f4f4ff] 
            placeholder:text-[#4D4C7D]
          focus:border-[#c7c6e4] focus:ring-2 focus:ring-[#c7c6e4]
            transition-all duration-200"
          />
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4D4C7D]" />
        </div>

        <div className="relative">
          <FiBell
            className="cursor-pointer text-[#4D4C7D] text-2xl hover:bg-[#f4f4ff] p-1 rounded-md"
            onClick={() => setShowNotif(!showNotif)}
          />
          {/* <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span> */}

          {showNotif && (
            <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-3 ">
              <p className="text-sm text-gray-500 ">
                No new notifications
              </p>
            </div>
          )}
        </div>
{/* 
        <span className="cursor-pointer ">
          <FiSettings className="w-5 h-5 text-[#4D4C7D] hover:rotate-90 transition-transform duration-300  hover:bg-[#f4f4ff] rounded-md text-lg " />

        </span> */}


        <Link to="/profile">
          <FiUser className="p-1 text-[#4D4C7D] cursor-pointer hover:bg-[#f4f4ff] rounded-md text-2xl " />
        </Link>
      </div>
    </div >
  );
};

export default Navbar;