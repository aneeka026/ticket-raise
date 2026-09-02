import React, { useState } from "react";

const Profile = () => {

  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "User",
    email: "user@gmail.com",
    dob: "28 April 2003",
    company: "NCM",
    skills: "HTML, CSS, JavaScript, React JS, Java, Spring Boot",
    jobTitle: "Software Developer",
    experience: "3 Months",
    education: "B.Tech (CSE)"
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h2 className="text-xl font-bold mb-2 text-[#4D4C7D]">
        Profile
      </h2>

      <div className=" bg-white rounded-md  border border-gray-200 p-6 space-y-6">

        <div className="flex justify-between items-start mb-8">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-[#4D4C7D] text-white flex items-center justify-center text-md font-semibold">
              {profile.name.charAt(0)}
            </div>

            <div>
              <h3 className="text-md font-semibold ">
                {profile.name}
              </h3>
              <p className="text-sm text-gray-500">
                {profile.jobTitle}
              </p>
            </div>

          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-[#4D4C7D] text-white px-5 py-2 rounded-md text-sm hover:bg-[#b9b8da] hover:text-[#4D4C7D]"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>

        </div>

        {!editMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">

            <div className="space-y-5">

              <div>
                <p className="text-gray-400">Name</p>
                <p className="font-medium text-gray-800">{profile.name}</p>
              </div>

              <div>
                <p className="text-gray-400">Date of Birth</p>
                <p className="font-medium text-gray-800">{profile.dob}</p>
              </div>

              <div>
                <p className="text-gray-400">Skills</p>
                <p className="font-medium text-gray-800">{profile.skills}</p>
              </div>

              <div>
                <p className="text-gray-400">Job Title</p>
                <p className="font-medium text-gray-800">{profile.jobTitle}</p>
              </div>

              <div>
                <p className="text-gray-400">Education</p>
                <p className="font-medium text-gray-800">{profile.education}</p>
              </div>

            </div>

            <div className="space-y-5">

              <div>
                <p className="text-gray-400">Email</p>
                <p className="font-medium text-gray-800">{profile.email}</p>
              </div>

              <div>
                <p className="text-gray-400">Company</p>
                <p className="font-medium text-gray-800">{profile.company}</p>
              </div>

              <div>
                <p className="text-gray-400">Experience</p>
                <p className="font-medium text-gray-800">{profile.experience}</p>
              </div>

            </div>

          </div>
        )}

        {editMode && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">

            <div>
              <label className="text-gray-500 mb-1 block">Name</label>
              <input
                type="text"
                value={profile.name}
                disabled
                className="w-full px-3 py-2 rounded-md bg-gray-100 "
              />
            </div>

            <div>
              <label className="text-gray-500 mb-1 block">Email</label>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full px-3 py-2 rounded-md bg-gray-100 "
              />
            </div>

            <div>
              <label className="text-gray-500 mb-1 block">Date of Birth</label>
              <input
                type="text"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#4D4C7D]"
              />
            </div>

            <div>
              <label className="text-gray-500 mb-1 block">Company</label>
              <input
                type="text"
                name="company"
                value={profile.company}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#4D4C7D]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-500 mb-1 block">Skills</label>
              <input
                type="text"
                name="skills"
                value={profile.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#4D4C7D]"
              />
            </div>

            <div>
              <label className="text-gray-500 mb-1 block">Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={profile.jobTitle}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#4D4C7D]"
              />
            </div>

            <div>
              <label className="text-gray-500 mb-1 block">Experience</label>
              <input
                type="text"
                name="experience"
                value={profile.experience}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#4D4C7D]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-500 mb-1 block">Education</label>
              <input
                type="text"
                name="education"
                value={profile.education}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-gray-200 outline-none focus:ring-2 focus:ring-[#4D4C7D]"
              />
            </div>

            <button
              onClick={() => setEditMode(false)}
              className="col-span-2 bg-[#4D4C7D] text-white py-2.5 rounded-md mt-2 hover:bg-[#b9b8da] hover:text-[#4D4C7D]"
            >
              Save Changes
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Profile;