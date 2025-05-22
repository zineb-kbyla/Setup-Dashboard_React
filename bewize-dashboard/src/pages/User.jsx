import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye, faHistory, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../components/FilterByButton";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import OrderRow from "../components/Tables/OrderRow";
import SubscriptionRow from "../components/Tables/SubscriptionRow";
import mockOrders from "../data/mockOrders";

const subscriptions = [
  {
    id: "SUB-001",
    startDate: "2023-11-15",
    endDate: "2024-11-15",
    orderId: "ORD-001"
  },
  {
    id: "SUB-002",
    startDate: "2023-11-16",
    endDate: "2024-11-16",
    orderId: "ORD-002"
  },
  {
    id: "SUB-003",
    startDate: "2023-11-17",
    endDate: "2024-11-17",
    orderId: "ORD-003"
  },
  {
    id: "SUB-004",
    startDate: "2023-11-18",
    endDate: "2024-11-18",
    orderId: "ORD-004"
  },
  {
    id: "SUB-005",
    startDate: "2023-11-19",
    endDate: "2024-11-19",
    orderId: "ORD-005"
  }
];

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
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
          <motion.div 
            className="main flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={itemVariants} className="text-xl font-semibold">User Details</motion.h1>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <div className="card border rounded-lg shadow-sm bg-white p-4 h-full">
                  <img
                    src={userData.avatar}
                    className="w-full rounded-lg border shadow-sm"
                    alt={`${userData.name}'s profile`}
                  />
                  <h2 className="mt-4 text-center text-lg font-semibold">
                    {userData.name}
                  </h2>
                  <p className="text-center text-gray-500">{userData.email}</p>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="card border rounded-lg shadow-sm bg-white p-4 h-full">
                  <h2 className="font-semibold text-lg pb-4">
                    User Information
                  </h2>

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
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-semibold text-lg flex items-center gap-2 pb-3">
                <FontAwesomeIcon icon={faHistory} className="text-gray-600" />
                Order History
              </h2>
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      status
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      amount
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      date
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      transaction id
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      plan type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOrders.length > 0 ? (
                    mockOrders.map((order) => (
                      <OrderRow key={mockOrders.id} order={order} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="font-semibold text-lg flex items-center gap-2 pb-3">
                <FontAwesomeIcon icon={faCreditCard} className="text-gray-600" />
                Subscriptions
              </h2>
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      id
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      start date
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      end date
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      order id
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscriptions.length > 0 ? (
                    subscriptions.map((subscription) => (
                      <SubscriptionRow key={subscription.id} subscription={subscription} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No subscriptions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
