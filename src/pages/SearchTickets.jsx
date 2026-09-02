import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ticketsData from "../data/ticketsData";

const tableData = ticketsData;

const parseCustomDate = (dateStr) => {
  const [day, month, year] = dateStr.split("/");
  return new Date(`${year}-${month}-${day}`);
};

// const tableData = [
//   { id: "TCK-101", title: "Issue1", department: "IT", priority: "HIGH", status: "OPEN", date: "30/3/2026" },
//   { id: "TCK-236", title: "Issue2", department: "HR", priority: "CRITICAL", status: "IN_PROGRESS", date: "29/3/2026" },
//   { id: "TCK-532", title: "Issue3", department: "Sales", priority: "LOW", status: "IN_PROGRESS", date: "27/3/2026" },
//   { id: "TCK-467", title: "Issue4", department: "Support", priority: "LOW", status: "OPEN", date: "25/3/2026" },
//   { id: "TCK-378", title: "Issue5", department: "HR", priority: "HIGH", status: "CLOSED", date: "24/3/2026" },
//   { id: "TCK-220", title: "Issue6", department: "IT", priority: "MEDIUM", status: "OPEN", date: "22/3/2026" },
//   { id: "TCK-102", title: "Issue1", department: "IT", priority: "HIGH", status: "OPEN", date: "30/3/2026" },
//   { id: "TCK-233", title: "Issue2", department: "HR", priority: "CRITICAL", status: "IN_PROGRESS", date: "29/3/2026" },
//   { id: "TCK-530", title: "Issue3", department: "Sales", priority: "HIGH", status: "IN_PROGRESS", date: "27/3/2026" },
//   { id: "TCK-465", title: "Issue4", department: "Support", priority: "HIGH", status: "OPEN", date: "25/3/2026" },
//   { id: "TCK-370", title: "Issue5", department: "HR", priority: "LOW", status: "CLOSED", date: "24/3/2026" },
//   { id: "TCK-210", title: "Issue6", department: "IT", priority: "MEDIUM", status: "OPEN", date: "22/3/2026" },
// ];

const SearchTickets = ({tickets}) => {
    const tableData = tickets;
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;

  const filteredData = tableData.filter((item) => {
    const text = search.toLowerCase();

    const matchesSearch =
      item.id.toLowerCase().includes(text) ||
      item.title.toLowerCase().includes(text);

    const matchesStatus =
      statusFilter === "" || item.status === statusFilter;

    let matchesDate = true;

    if (dateFilter !== "") {
      const itemDate = parseCustomDate(item.date);
      const selectedDate = new Date(dateFilter);

      matchesDate =
        itemDate.getDate() === selectedDate.getDate() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getFullYear() === selectedDate.getFullYear();
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleExport = () => {
    const headers = ["Ticket ID", "Issue Title", "Department", "Priority", "Status", "Date"];

    const rows = tableData.map(item => [
      item.id,
      item.title,
      item.department,
      item.priority,
      item.status,
      item.date
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "tickets.csv";
    link.click();
  };

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

  const getPriorityStyle = (priority) => {
    if (priority === "HIGH")
      return "bg-orange-100 text-orange-600";
    if (priority === "MEDIUM")
      return "bg-yellow-100 text-yellow-700";
    if (priority === "LOW")
      return "bg-green-100 text-green-600";
    if (priority === "CRITICAL")
      return "bg-red-100 text-red-600";
  };

  return (
    <div className="p-6 bg-gray-50  overflow-y-auto">
      <div className="min-h-170">

        <h2 className="text-xl font-bold mb-4 text-[#4D4C7D]">
          All Tickets
        </h2>

        <div className="bg-white p-6 rounded-md border border-gray-300 mb-6">

          {/* <h3 className="text-gray-700 font-medium mb-4">Filters</h3> */}

          {/* <div className="flex flex-wrap gap-8"> */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4" >

            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm 
            focus:outline-none focus:ring-2 focus:ring-[#4D4C7D] focus:border-[#4D4C7D]
            transition "
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm 
            focus:outline-none focus:ring-2 focus:ring-[#4D4C7D] focus:border-[#4D4C7D]"
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
            focus:outline-none focus:ring-2 focus:ring-[#4D4C7D] focus:border-[#4D4C7D]"
            />

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setDateFilter("");
                setCurrentPage(1);
              }}
              className="px-5 py-2.5 bg-[#4D4C7D] text-white rounded-lg text-sm hover:bg-[#b9b8da] hover:text-[#4D4C7D] transition"
            >
              Reset
            </button>

            <button
              onClick={handleExport}
              className="px-5 py-2.5 bg-[#4D4C7D] text-white rounded-lg text-sm hover:bg-[#b9b8da] hover:text-[#4D4C7D] transition"

            >Export</button>

          </div>
        </div>

        <div className="overflow-x-auto md:col-span-2 bg-white rounded-md border border-gray-300 ">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 ">
              <tr>
                <th className="p-4 text-left">Ticket ID</th>
                <th className="p-4 text-left">Issue Title</th>
                <th className="p-4 text-left">Department</th>
                <th className="p-4 text-left">Priority</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((item, i) => (
                <tr key={item.id} className="border border-gray-300 hover:bg-gray-50 transition">

                  <td className="p-4 text-[#4D4C7D] font-medium">
                    {item.id}
                  </td>

                  <td className="p-4 font-medium">{item.title}</td>

                  <td className="p-4">{item.department}</td>

                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-md ${getPriorityStyle(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>

                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-md ${getStatusStyle(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4 text-gray-500">
                    {parseCustomDate(item.date).toLocaleDateString("en-GB")}
                  </td>

                  <td
                    onClick={() => navigate(`/ticket/${item.id}`, { state: item })}
                    className="p-4 text-[#4D4C7D] hover:underline cursor-pointer">VIEW</td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>


        <div className="flex justify-end mt-4 gap-2">

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-md flex items-center justify-center text-sm ${currentPage === i + 1
                ? "bg-[#4D4C7D] text-white"
                : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {i + 1}
            </button>
          ))}

        </div>
      </div>
    </div>
  );
};

export default SearchTickets;
