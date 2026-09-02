import React, {useState} from "react"
import { Outlet, NavLink,Link } from "react-router-dom";
import { FaHome, FaChartPie, FaUserPlus, FaUser, FaEye, FaTable, FaEnvelope, FaDownload, FaExternalLinkAlt, FaSearch } from "react-icons/fa";
import { FaSignInAlt, FaTicketAlt } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import { LayoutDashboard } from 'lucide-react';
import Navbar from '../nav'
import Sidebar from'../Sidebar'


const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className=" h-screen">

      <Navbar setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
 
       <Sidebar sidebarOpen={sidebarOpen} />

        <main  className="flex-1 bg-gray-50 ">
          <Outlet />
        </main >

      </div>
    </div>
  );
};

export default Layout;


// const Layout = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">

     
//       <div className="w-64 bg-blue-400 text-white p-5 space-y-6">
//         <h1 className="text-2xl font-bold">Welcome Admin</h1>

//         <nav className="space-y-3">
//           <Link to="/dashboard" className="flex items-center gap-3 hover:bg-blue-300 p-2 rounded">
//             <FaHome /> Home
//           </Link>

//           <Link to="/users" className="flex items-center gap-3 hover:bg-blue-300 p-2 rounded">
//             <FaUsers /> User Management
//           </Link>

//           <Link to="/master" className="flex items-center gap-3 hover:bg-blue-300 p-2 rounded">
//             <FaDatabase /> Master Management
//           </Link>

//           <Link to="/metadata" className="flex items-center gap-3 hover:bg-blue-300 p-2 rounded">
//             <FaLayerGroup /> MetaData
//           </Link>

//           <Link to="/reports" className="flex items-center gap-3 hover:bg-blue-300 p-2 rounded">
//             <FaChartBar /> Reports
//           </Link>

//           <p className="flex items-center gap-3 hover:bg-blue-300 p-2 rounded cursor-pointer">
//             <FaSignOutAlt /> Logout
//           </p>
//         </nav>
//       </div>

    
//       <div className="flex-1 flex flex-col">
//         <Outlet />
//       </div>

//     </div>
//   );
// };

// export default Layout;