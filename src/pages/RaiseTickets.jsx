import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt } from "react-icons/fa";

const RaiseTicket = ({ addTicket }) => {
  const floatingInput =
    "peer w-full border border-gray-300 px-2 pt-4 pb-0 text-sm rounded-sm outline-none focus:ring-2 focus:ring-[#4D4C7D]";

  const floatingLabel =
    "absolute left-3 bg-white px-1 text-gray-400 text-sm top-2 transition-all \
  peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#4D4C7D] \
  peer-valid:-top-2 peer-valid:text-xs";


  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    location: "",
    title: "",
    category: "",
    subCategory: "",
    description: "",
    priority: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Ticket raised")

    const newTicket = {
      id: "TCK-" + Math.floor(Math.random() * 1000),
      title: form.title,
      department: form.department,
      priority: form.priority.toUpperCase(),
      status: "OPEN",
      date: new Date().toLocaleDateString("en-GB"),
    };

    addTicket(newTicket);
  };

  return (
    <div className="p-6 bg-gray-50 overflow-y-auto mb-12">
      <div className="min-h-screen ">
        <h2 className="text-xl font-bold mb-4 text-[#4D4C7D]">Raise New Ticket</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-md  border border-gray-200 p-6 space-y-6"
        >

          <div>

            <h3 className="font-semibold text-[#4D4C7D] mb-4 pb-2 flex items-center gap-2">
              Basic Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  required
                  className={floatingInput}
                  onChange={handleChange}
                  value={form.name}
                />
                <label className={floatingLabel}>Full Name</label>
              </div>


              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  required
                  className={floatingInput}
                  onChange={handleChange}
                  value={form.email}
                />
                <label className={floatingLabel}>Email</label>
              </div>


              <div className="relative w-full">
                <input
                  type="text"
                  name="phone"
                  required
                  className={floatingInput}
                  onChange={handleChange}
                  value={form.phone}
                />
                <label className={floatingLabel}>Phone</label>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              <div className="relative w-full">
                <select
                  name="department"
                  required
                  className={floatingInput}
                  onChange={handleChange}
                  value={form.department}
                >
                  <option value="" disabled hidden></option>
                  <option>IT</option>
                  <option>HR</option>
                  <option>Sales</option>
                  <option>Support</option>
                </select>
                <label className={floatingLabel}>Department</label>
              </div>


              <div className="relative w-full">
                <input
                  type="text"
                  name="location"
                  required
                  className={floatingInput}
                  onChange={handleChange}
                  value={form.location}
                />
                <label className={floatingLabel}>Location</label>
              </div>

            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#4D4C7D] mb-4">
              Issue Details
            </h3>

            <div className="relative w-full mb-4">
              <input
                type="text"
                name="title"
                required
                className={floatingInput}
                onChange={handleChange}
                value={form.title}
              />
              <label className={floatingLabel}>Issue Title</label>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="relative w-full">
                <select
                  name="category"
                  required
                  className={floatingInput}
                  onChange={handleChange}
                  value={form.category}
                >
                  <option value="" disabled hidden></option>
                  <option>IT Issue</option>
                  <option>HR Request</option>
                  <option>Maintenance</option>
                  <option>Service Request</option>
                  <option>Complaint</option>
                  <option>Others</option>
                </select>
                <label className={floatingLabel}>Category</label>
              </div>

              <div className="relative w-full">
                <select
                  name="subCategory"
                  className={floatingInput}
                  onChange={handleChange}
                  required
                  value={form.subCategory}
                >
                  <option value="" disabled hidden></option>
                  <option>IT Issue</option>
                  <option>HR Request</option>
                </select>
                <label className={floatingLabel}>Sub Category</label>
              </div>
            </div>

            <div className="relative w-full mt-4">
              <textarea
                name="description"
                required
                rows="4"
                className={`${floatingInput} resize-none`}
                onChange={handleChange}
              ></textarea>
              <label className={floatingLabel}>Description</label>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#4D4C7D] mb-4">
              Priority Selection
            </h3>

            <div className="flex gap-4 flex-wrap">
              {["Low", "Medium", "High", "Critical"].map((p) => (
                <label
                  key={p}
                  className={`px-4 py-1 border border-gray-300 rounded-md cursor-pointer ${form.priority === p
                    ? "bg-[#4D4C7D] text-white"
                    : "bg-gray-100 text-gray-500"
                    }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value={p}
                    className="hidden"
                    onChange={handleChange}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-[#4D4C7D] mb-4">
              Attachments
            </h3>

            <input
              type="file"
              name="file"
              className="block w-full border border-dashed border-gray-400 text-gray-500 p-4 rounded-lg"
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              type="submit"
              className="px-6 py-2  bg-[#4D4C7D] text-white rounded-md hover:bg-[#b9b8da] hover:text-[#4D4C7D]"
            >
              Submit Ticket
            </button>
          </div>


        </form>
      </div>
    </div>
  );
};

export default RaiseTicket;