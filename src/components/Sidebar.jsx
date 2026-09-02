import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaChartPie, FaUserPlus, FaUser, FaEye, FaTable, FaEnvelope, FaDownload, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { FaSignInAlt, FaTicketAlt } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { LayoutDashboard } from 'lucide-react';

const Sidebar = ({ sidebarOpen }) => {
    return (

        <div className={` hidden md:block bg-[#4D4C7D] text-white p-4 transition-all duration-300 ${sidebarOpen ? "w-60" : "w-20"}`}>

            <h2 className="text-lg font-semibold mb-6">
                {sidebarOpen ? "Navigation" : ""}
            </h2>

            <ul className="space-y-3 text-sm">

                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `flex items-center ${sidebarOpen ? "gap-3" : "justify-center"} p-2 rounded-md transition-all duration-200 
                             ${isActive
                                ? "bg-white text-[#4D4C7D] border-l-4 border-gray-400"
                                : "text-white hover:bg-white hover:text-[#4D4C7D]"
                            }`
                        }
                    >
                        <LayoutDashboard size={16} />
                        {sidebarOpen && <span  className={`${sidebarOpen ? "inline" : "hidden"}`}>Dashboard</span>}
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/raise"
                        className={({ isActive }) =>
                            `flex items-center ${sidebarOpen ? "gap-3" : "justify-center"} p-2 rounded-md transition-all duration-200 
                             ${isActive
                                ? "bg-white text-[#4D4C7D] border-l-4 border-gray-400"
                                : "text-white hover:bg-white hover:text-[#4D4C7D]"
                            }`
                        }
                    >
                        <FaTicketAlt />
                        {sidebarOpen && <span>Raise Ticket</span>}
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `flex items-center ${sidebarOpen ? "gap-3" : "justify-center"} p-2 rounded-md transition-all duration-200 
                             ${isActive
                                ? "bg-white text-[#4D4C7D] border-l-4 border-gray-400"
                                : "text-white hover:bg-white hover:text-[#4D4C7D]"
                            }`
                        }
                    >
                        <FaSearch />
                        {sidebarOpen && <span>My Tickets</span>}
                    </NavLink>
                </li>


                <li>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            `flex items-center ${sidebarOpen ? "gap-3" : "justify-center"} p-2 rounded-md transition-all duration-200 
                             ${isActive
                                ? "bg-white text-[#4D4C7D] border-l-4 border-gray-400"
                                : "text-white hover:bg-white hover:text-[#4D4C7D]"
                            }`
                        }
                    >
                        <FaUser />
                        {sidebarOpen && <span>Profile</span>}
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center ${sidebarOpen ? "gap-3" : "justify-center"} p-2 rounded-md transition-all duration-200 
                             ${isActive
                                ? "bg-white text-[#4D4C7D] border-l-4 border-gray-400"
                                : "text-white hover:bg-white hover:text-[#4D4C7D]"
                            }`
                        }
                    >
                        <FaSignInAlt />
                        {sidebarOpen && <span>Logout</span>}
                    </NavLink>

                </li>

            </ul>
        </div>
    );
};

export default Sidebar;
