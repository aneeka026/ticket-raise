// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import { PieChart, Pie, Cell, Legend } from "recharts";

// const data = [
//   { name: "Defects", value: 0 },
//   { name: "Performance", value: 0 },
//   { name: "Queries", value: 0 },
// ];

// const pieData = [
//   { name: "February", value: 60 },
//   { name: "March", value: 25 },
//   { name: "April", value: 15 },
// ];

// const COLORS = ["#facc15", "#3b82f6", "#ef4444"];

const Dashboard = () => {

  return (
    <></>

//     <div className="p-4 space-y-4">

//       <div className="bg-white p-3 rounded shadow-sm">
//         <select className="border px-3 py-1 text-sm">
//           <option>2026</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-3 gap-4 stats-grid">

//         <div className="bg-green-500 text-white p-4 rounded">
//           <h2 className="text-2xl font-bold">0</h2>
//           <p className="text-sm">Tickets in Progress</p>
//         </div>

//         <div className="bg-orange-500 text-white p-4 rounded">
//           <h2 className="text-2xl font-bold">100%</h2>
//           <p className="text-sm">Average SLA Met</p>
//         </div>

//         <div className="bg-red-500 text-white p-4 rounded">
//           <h2 className="text-2xl font-bold">1 Days</h2>
//           <p className="text-sm">Average TAT</p>
//         </div>

//       </div>

//       <div className="grid grid-cols-2 gap-4 charts-grid">

//         {/* <div className="bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-semibold mb-2">Tickets in Progress</h3>
//           <div className="h-40 flex items-center justify-center text-gray-400">
//             Graph Placeholder
//           </div>
//         </div> */}

//         {/* <div className="bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-semibold mb-2">Tickets in Progress</h3>

//           <div className="h-40">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={data}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="value" fill="#22c55e" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div> */}

//         <div className="bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-semibold mb-2">Tickets in Progress</h3>

//           <div className="h-40">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={data}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />

//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#cbd5e1" 
//                   strokeWidth={2}
//                   dot={{ r: 3 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* <div className="bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-semibold mb-2">Environment (2026)</h3>
//           <div className="h-40 flex items-center justify-center text-gray-400">
//             Pie Chart Placeholder
//           </div>
//         </div> */}

//         <div className="bg-white p-4 shadow-sm">
//           <h3 className="text-sm font-semibold mb-2">Environment (2026)</h3>

//           <div className="h-40">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   dataKey="value"
//                   outerRadius={60}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={index} fill={COLORS[index]} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>

//       <div className="bg-white p-4 shadow-sm space-y-3">
//         <h3 className="text-sm font-semibold">Reports</h3>

//         <div className="grid grid-cols-4 gap-3 report-grid">
//           <select className="border px-2 py-1 text-sm">
//             <option>Problem Category</option>
//           </select>

//           <select className="border px-2 py-1 text-sm">
//             <option>Ticket Status</option>
//           </select>

//           <input type="date" className="border px-2 py-1 text-sm" />
//           <input type="date" className="border px-2 py-1 text-sm" />
//         </div>

//         <div className="text-right">
//           <button className="bg-blue-500 text-white px-4 py-1 text-sm rounded">
//             Generate Report
//           </button>
//         </div>
//       </div>

//     </div>
  )
};

export default Dashboard;