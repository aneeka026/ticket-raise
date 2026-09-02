import React from "react";
import { useLocation } from "react-router-dom";

const TicketDetails = () => {
  const { state } = useLocation();

  if (!state) return <p>No Data Found</p>;

  return (
    <div className="p-6  min-h-screen bg-gray-50">
      <h2 className="text-xl font-bold mb-4 text-[#4D4C7D]">Ticket Details</h2>

      <div className="bg-white p-6 border rounded-md border-gray-300 space-y-3">
        <p><strong>Title:</strong> {state.title}</p>
        <p><strong>Department:</strong> {state.department}</p>
        <p><strong>Priority:</strong> {state.priority}</p>
        <p><strong>Status:</strong> {state.status}</p>
        <p><strong>Date:</strong> {state.date}</p>
      </div>
    </div>
  );
};

export default TicketDetails;