import React from "react";
import { RefreshCw, Ticket, CircleCheck, ExternalLink } from 'lucide-react';
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ticketsData from "../data/ticketsData";

const tableData = ticketsData;

const Dashboard = () => {

    const parseCustomDate = (dateStr) => {
        const [datePart] = dateStr.split(",");
        const [day, month, year] = datePart.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const currentItems = tableData.slice(0, 5);
    const getStatusStyle = (status) => {
        if (status === "OPEN")
            return "bg-red-100 text-red-600";
        if (status === "IN_PROGRESS")
            return "bg-yellow-100 text-yellow-700";
        if (status === "CLOSED")
            return "bg-green-100 text-green-600";
    };

    const statusCount = {
        OPEN: tableData.filter(i => i.status === "OPEN").length,
        IN_PROGRESS: tableData.filter(i => i.status === "IN_PROGRESS").length,
        CLOSED: tableData.filter(i => i.status === "CLOSED").length,
    };

    const pieData = [
        { name: "Open", value: statusCount.OPEN },
        { name: "In Progress", value: statusCount.IN_PROGRESS },
        { name: "Closed", value: statusCount.CLOSED },
    ];

    const COLORS = ["#ef4444", "#f59e0b", "#22c55e"];


    return (
        <div className="p-6 bg-gray-50 min-h-screen ">

            {/* <div className="min-h-150"> */}
            {/* <h2 className="text-xl font-semibold text-black-700 mb-1"> */}
            <h2 className="text-xl font-bold mb-2 text-[#4D4C7D]">
                Dashboard Overview
            </h2>

            <p className="text-gray-700 mb-3"> Welcome back, user. Here's what's happening today.</p>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

                {[
                    { count: tableData.length, label: "Total Tickets", icon: <Ticket />, bg: "bg-purple-100", color: "text-[#4D4C7D]" },
                    { count: statusCount.OPEN, label: "Open", icon: <RefreshCw />, bg: "bg-red-100", color: "text-red-600" },
                    { count: statusCount.IN_PROGRESS, label: "In Progress", icon: <ExternalLink />, bg: "bg-yellow-100", color: "text-yellow-600" },
                    { count: statusCount.CLOSED, label: "Closed", icon: <CircleCheck />, bg: "bg-green-100", color: "text-green-600" },
                ].map((card, i) => (
                    <div
                        key={i}
                        className="bg-white p-5 rounded-md border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center"
                    >
                        <div>
                            <h2 className="text-2xl font-semibold">{card.count}</h2>
                            <p className="text-sm text-gray-400">{card.label}</p>
                        </div>
                        <div className={`${card.bg} ${card.color} p-3 rounded-xl text-lg`}>
                            {card.icon}
                        </div>
                    </div>
                ))}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="md:col-span-2 bg-white rounded-md border border-gray-300 shadow-sm overflow-hidden">
                    <div className="bg-white px-6 py-2 border-b border-gray-300">
                        <h3 className="text-gray-700 font-medium">My Recent Tickets</h3>
                    </div>

                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-sm">

                            <thead className="bg-gray-100 ">
                                <tr>
                                    <th className="p-4 text-left">Ticket ID</th>
                                    <th className="p-4 text-left">Issue Title</th>
                                    <th className="p-4 text-left">Department</th>
                                    <th className="p-4 text-left">Priority</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-left">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItems.map((item, i) => (
                                    <tr key={i} className="border border-gray-300 hover:bg-gray-50 transition">

                                        <td className="p-4  font-medium">
                                            {item.id}
                                        </td>

                                        <td className="p-4">{item.title}</td>


                                        <td className="p-4">{item.department}</td>

                                        <td className="p-4">{item.priority}</td>

                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="p-4 text-gray-500">
                                            {parseCustomDate(item.date).toLocaleDateString("en-GB")}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        <Link to="/search" className="text-[#4D4C7D] hover:underline flex justify-center p-2">View All</Link>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md border border-gray-300 shadow-sm">
                    <h3 className="text-gray-700 font-medium mb-3">Tickets by Status</h3>

                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={35}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* <div className="md:col-span-3">
                        <h3 className="text-gray-700 font-medium mb-3">Quick Actions</h3>

                        <div className="flex gap-4 flex-wrap">
                            <NavLink
                                to="/raise-ticket"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-2 rounded-md transition-all duration-200
                                   ${isActive
                                        ? "bg-[#4D4C7D] text-white"
                                        : "text-gray-700 hover:bg-[#4D4C7D] hover:text-white"
                                    }`
                                }
                            >
                                <PlusCircle size={16} />
                                <span>Raise New Ticket</span>
                            </NavLink>

                            <NavLink
                                to="/search-ticket"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-2 rounded-md transition-all duration-200
                                   ${isActive
                                        ? "bg-[#4D4C7D] text-white"
                                        : "text-gray-700 hover:bg-[#4D4C7D] hover:text-white"
                                    }`
                                }
                            >
                                <Search size={16} />
                                <span>Search Tickets</span>
                            </NavLink>


                            <NavLink
                                to="/export-ticket"
                                className={({ isActive }) =>
                                    `flex items-center gap-3 p-2 rounded-md transition-all duration-200
                                   ${isActive
                                        ? "bg-[#4D4C7D] text-white"
                                        : "text-gray-700 hover:bg-[#4D4C7D] hover:text-white"
                                    }`
                                }
                            >
                                <Download size={16} />
                                <span>Export Tickets</span>
                            </NavLink>
                        </div>
                    </div> */}

            </div>

            {/* </div> */}
        </div>
    );
};

export default Dashboard;