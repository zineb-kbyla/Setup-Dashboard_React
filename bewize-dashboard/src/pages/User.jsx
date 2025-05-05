import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function User() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const userData = location.state?.user;


  // Animation variants
  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return isNaN(date) ? dateString : date.toLocaleString();
    } catch {
      return dateString;
    }
  };



  return (
    <div className="flex flex-col h-screen">
      {/* Top navbar */}
      <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </motion.div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </motion.div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <div className="main flex flex-col gap-4">
            <h1 className="text-xl font-semibold">Student Details</h1>
            <div className="flex flex-col md:flex-row justify-start gap-4">
              {/* Student Avatar Card */}
              <div className="w-full md:w-1/3">
                <div className="card border rounded-lg shadow-sm bg-white p-4">
                  <img
                    src={userData.avatar}
                    className="w-full rounded-lg border shadow-sm"
                    alt={`${userData.name}'s profile`}
                  />
                  <h2 className="mt-4 text-center text-lg font-semibold">
                    {userData.name}
                  </h2>
                  <p className="text-center text-gray-500">{userData.email}</p>
                  <div className="mt-4 p-2 bg-blue-50 rounded-lg">
                    <p className="text-sm py-1" >
                      <span className="font-semibold">CNE:</span> {userData.cne}
                    </p>
                    <p className="text-sm py-1">
                      <span className="font-semibold">Completed Courses:</span>{" "}
                      {userData.finished_courses_count || "0"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Details Card */}
              <div className="w-full md:w-2/3">
                <div className="card flex flex-col p-4 border rounded-lg gap-4 bg-white">
                  <h2 className="font-semibold text-lg">Student Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Personal Information */}
                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={
                          userData.first_name || userData.name.split(" ")[0]
                        }
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Last Name</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={
                          userData.last_name ||
                          userData.name.split(" ").slice(1).join(" ")
                        }
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Email</label>
                      <input
                        type="email"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.email}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Phone</label>
                      <input
                        type="tel"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.phone}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Gender</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.gender}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Birthday</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={formatDate(userData.birthday)}
                      />
                    </div>

                    {/* Academic Information */}
                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Level ID</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.level_id || "N/A"}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">School ID</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.school_id || "N/A"}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">
                        Classroom ID
                      </label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.classroom_id || "N/A"}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Parent ID</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.parent_id || "N/A"}
                      />
                    </div>

                    {/* Activity Information */}
                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">
                        Last Login
                      </label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={formatDate(userData.last_login)}
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">
                        Last Visit
                      </label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={formatDate(userData.last_visit)}
                      />
                    </div>

                    {/* Location Information */}
                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">Country</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={
                          userData.location_country ||
                          userData.store_country ||
                          "N/A"
                        }
                      />
                    </div>

                    <div className="form-input flex flex-col gap-1">
                      <label className="font-semibold text-sm">City</label>
                      <input
                        type="text"
                        className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                        disabled
                        value={userData.location_city || "N/A"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
