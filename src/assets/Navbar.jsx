import React, { useState } from "react";
import {
  FaBars,
  FaBell,
  FaUserCircle,
  FaKey,
  FaCommentDots,
  FaSignOutAlt,
  FaSearch
} from "react-icons/fa";
import { LuSearch } from 'react-icons/lu';

const Navbar = ({ setSidebarOpen }) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="bg-[#415A77] text-white flex items-center justify-between px-4 py-2 relative">

      <FaBars
        className="cursor-pointer"
        onClick={() => setSidebarOpen(prev => !prev)}
      />

      {/* <div className="p-4">
        <FaSearch className="text-black" />
        <input placeholder="Search for our products here" className=" bg-white text-gray-500 border rounded-sm border-[#415a772f] px-4 py-2 text-sm outline-none" />
      </div> */}

      <div style={{ position: 'relative' }}>
        <input type="text" className="border border-white rounded" placeholder="Search..." />
        <FaSearch style={{ position: 'absolute', right: '10px', top:'5px ' }} />
      </div>

      <div className="flex items-center gap-6 text-sm">

        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
            onClick={() => setShowNotif(!showNotif)}
          >
            <FaBell />
            <span>Ministry of Defense - MS Branch</span>
          </div>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-white text-gray-500 rounded-md shadow-lg p-3 z-50">
              <p className="text-sm text-gray-500">
                You have no notifications
              </p>
              <hr className="my-2 text-gray-200" />
              <button className="text-gray-500 text-sm hover:underline">
                View All
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer hover:text-gray-200"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <FaUserCircle />
            <span>User</span>
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-500 rounded-md shadow-lg py-2 z-50">

              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm">
                <FaKey /> Change Password
              </button>

              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-sm">
                <FaCommentDots /> Feedback
              </button>

              <hr className="my-1 text-gray-200" />

              <button className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-gray-500 text-sm">
                <FaSignOutAlt /> Logout
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;