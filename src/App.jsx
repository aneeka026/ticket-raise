import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/UserDashboard";
import RaiseTickets from "./pages/RaiseTickets"
import SearchTickets from "./pages/SearchTickets"
import TicketDetails from "./pages/TicketDetails";
import Profile from "./pages/Profile"
import Login from './pages/Login'
import Register from './pages/Register'
import Layout from './components/Layout/Layout'
import ticketsData from "./data/ticketsData";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
    const [tickets, setTickets] = useState(ticketsData);

 const addTicket = (ticket) => {
    setTickets((prev) => [ticket, ...prev]);
  };

  return (
    <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/raise" element={<RaiseTickets addTicket={addTicket}/>} />
              <Route path="/search" element={<SearchTickets tickets={tickets} />} />
              <Route path="/ticket/:id" element={<TicketDetails />} />
              <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
    </BrowserRouter>
  );
}

export default App;