import React, { useState } from "react";
import { LuNotebook } from "react-icons/lu";
import { LayoutDashboard, RefreshCw, Ticket, CircleCheck, ExternalLink } from 'lucide-react';
import { FaRegNoteSticky, FaFileLines, FaPlus, FaTicket } from "react-icons/fa6";
import { FaTicketAlt } from 'react-icons/fa';
import { FiCircle, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';

const parseCustomDate = (dateStr) => {
  const [datePart] = dateStr.split(",");
  const [day, month, year] = datePart.split("/");
  return new Date(`${year}-${month}-${day}`);
};

const tableData = [
  { id: "TCK-10", title: "Issue1", department:"IT",priority:"HIGH", status: "OPEN", date: "30/3/2026" },
  { id: "TCK-6", title: "Issue2", department:"HR",priority:"HIGH", status: "IN_PROGRESS", date: "29/3/2026" },
  { id: "TCK-5", title: "Issue3", department:"Sales",priority:"HIGH", status: "IN_PROGRESS", date: "27/3/2026" },
  { id: "TCK-4", title: "Issue4", department:"Support",priority:"HIGH", status: "OPEN", date: "25/3/2026" },
  { id: "TCK-3", title: "Issue5", department:"HR",priority:"HIGH", status: "CLOSED", date: "24/3/2026" },
  { id: "TCK-2", title: "Issue6", department:"IT",priority:"HIGH", status: "OPEN", date: "22/3/2026" },
];

const Dashboard = () => {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const filteredData = tableData.filter((item) => {
    const text = search.toLowerCase();

    const matchesSearch =
      item.id.toLowerCase().includes(text) ||
      item.title.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "" || item.status === statusFilter;

    const matchesDate =
      dateFilter === "" ||
      (() => {
        const itemDate = parseCustomDate(item.date);
        const selectedDate = new Date(dateFilter);

        return (
          itemDate.getDate() === selectedDate.getDate() &&
          itemDate.getMonth() === selectedDate.getMonth() &&
          itemDate.getFullYear() === selectedDate.getFullYear()
        );
      })();

    return matchesSearch && matchesStatus && matchesDate;
  });


  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const getStatusStyle = (status) => {
    if (status === "OPEN")
      return "bg-red-100 text-red-600";
    if (status === "IN_PROGRESS")
      return "bg-yellow-100 text-yellow-700";
    if (status === "CLOSED")
      return "bg-green-100 text-green-600";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h2 className="text-xl font-semibold text-black-700 mb-1">
        Dashboard Overview
      </h2>

      <p className="text-gray-700"> Hello, user</p>


      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

        {[
          { count: 6, label: "Total Tickets", icon: <Ticket />, bg: "bg-purple-100", color: "text-[#4D4C7D]" },
          { count: 3, label: "Open", icon: <RefreshCw />, bg: "bg-red-100", color: "text-red-600" },
          { count: 2, label: "In Progress", icon: <ExternalLink />, bg: "bg-yellow-100", color: "text-yellow-600" },
          { count: 1, label: "Closed", icon: <CircleCheck />, bg: "bg-green-100", color: "text-green-600" },
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

      {/* <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">

        <h3 className="text-gray-700 font-medium mb-4">Filters</h3>

        <div className="flex flex-wrap gap-4">

          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 
            transition w-64"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => {
              setDateFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
          />

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setDateFilter("");
              setCurrentPage(1);
            }}
            className="px-5 py-2.5 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition"
          >
            Reset
          </button>

        </div>
      </div> */}

      <div className="bg-white rounded-md border border-gray-300 shadow-sm overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100 ">
            <tr>
              <th className="p-4 text-left">Ticket ID</th>
              <th className="p-4 text-left">Issue Title</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Assigned On</th>
              <th className="p-4 text-left">Action</th>
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
      </div>


      {/* <div className="flex justify-end mt-4 gap-2">

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm ${
              currentPage === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

      </div> */}

    </div>
  );
};

export default Dashboard;