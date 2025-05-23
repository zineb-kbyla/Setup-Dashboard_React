import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import UserOrdersTable from "../components/Tables/UserOrdersTable";
import UserSubscriptionsTable from "../components/Tables/UserSubscriptionsTable";
import mockOrders from "../data/mockOrders";
import mockSubscriptions from "../data/mockSubscriptions";
import { containerVariants, itemVariants, cardVariants } from "../variants/animations";
import DashboardLayout from "../layouts/DashboardLayout";
import { formatDate } from "../utils/dateUtils";

export default function User() {
  const location = useLocation();
  const user = location.state?.user;

  if (!user) {
    return (
      <div className="p-4 text-center text-gray-500">
        No user data available
      </div>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        className="main flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="text-xl font-semibold">User Details</motion.h1>
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <motion.div 
              className="card border rounded-lg shadow-sm bg-white p-4 h-full"
              variants={cardVariants}
            >
              <img
                src={user.avatar}
                className="w-full rounded-lg border shadow-sm"
                alt={`${user.name}'s profile`}
              />
              <h2 className="mt-4 text-center text-lg font-semibold">
                {user.name}
              </h2>
              <p className="text-center text-gray-500">{user.email}</p>
            </motion.div>
          </div>
          <div className="md:col-span-2">
            <motion.div 
              className="card border rounded-lg shadow-sm bg-white p-4 h-full"
              variants={cardVariants}
            >
              <h2 className="font-semibold text-lg pb-4">
                User Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Personal Information */}
                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={
                      user.first_name || user.name.split(" ")[0]
                    }
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">Last Name</label>
                  <input
                    type="text"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={
                      user.last_name ||
                      user.name.split(" ").slice(1).join(" ")
                    }
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">Email</label>
                  <input
                    type="email"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={user.email}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">Phone</label>
                  <input
                    type="tel"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={user.phone}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">Gender</label>
                  <input
                    type="text"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={user.gender}
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">Birthday</label>
                  <input
                    type="text"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={formatDate(user.birthday)}
                  />
                </motion.div>

                {/* Location Information */}
                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">Country</label>
                  <input
                    type="text"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={
                      user.location_country ||
                      user.store_country ||
                      "N/A"
                    }
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="form-input flex flex-col gap-1">
                  <label className="font-semibold text-sm">City</label>
                  <input
                    type="text"
                    className="w-full border shadow-sm rounded-lg py-2 px-3 outline-blue-500 text-sm disabled:bg-gray-50 text-gray-700"
                    disabled
                    value={user.location_city || "N/A"}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="font-semibold text-lg flex items-center gap-2 pb-3">
            <FontAwesomeIcon icon={faCartShopping} className="text-gray-600" />
            Order History
          </h2>
          <UserOrdersTable orders={mockOrders} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="font-semibold text-lg flex items-center gap-2 pb-3">
            <FontAwesomeIcon icon={faCreditCard} className="text-gray-600" />
            Subscriptions
          </h2>
          <UserSubscriptionsTable subscriptions={mockSubscriptions} />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
