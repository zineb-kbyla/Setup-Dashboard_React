import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Metric from "../components/charts_states/Metric";
import {
  faClipboardList,
  faShoppingCart,
  faTag,
  faU,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import UsersStates from "../components/charts_states/UsersStates";
import SubscriptionStates from "../components/charts_states/SubscriptionStates";
import { motion } from "framer-motion";
import TopCustomers from "../components/charts_states/TopCustomers";
import CategoriesStates from "../components/charts_states/CategoriesStates";
import OrderTrends from "../components/charts_states/OrderTrends";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Animation variants

  const metricVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 * index,
        duration: 0.4,
      },
    }),
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top navbar */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />


      <div className="flex flex-1">
        {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={metricVariants}
            >
              <Metric
                title={"Total Utilisateurs"}
                icon={faUsers}
                data={837}
                percentage={0.4}
                className="h-48"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={metricVariants}
            >
              <Metric
                title={"Total Commandes"}
                icon={faShoppingCart}
                data={1358}
                percentage={0.1}
                className="h-48"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={metricVariants}
            >
              <Metric
                title={"Total Abonnements"}
                icon={faClipboardList}
                data={1400}
                percentage={-0.7}
                className="h-48"
              />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={metricVariants}
            >
              <Metric
                title={"Total Remises"}
                icon={faTag}
                data={54879}
                percentage={-0.3}
                className="h-48"
              />
            </motion.div>
          </div>

          <div className="charts  grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              className="border rounded-lg shadow-sm my-4"
              initial="hidden"
              animate="visible"
              variants={chartVariants}
            >
              <UsersStates className="" />
            </motion.div>
            <motion.div
              className="border rounded-lg shadow-sm my-4"
              initial="hidden"
              animate="visible"
              variants={chartVariants}
              transition={{ delay: 0.4 }}
            >
              <SubscriptionStates className="" />
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={tableVariants}
              >
                <TopCustomers />
              </motion.div>
            </div>
            <motion.div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <p className="text-lg font-semibold text-black pb-4">
                  Distribution of Discounts
                </p>
                <CategoriesStates />
              </div>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={chartVariants}
          >
            <div className="OrderTrends border rounded-lg shadow-sm my-4 bg-gray-50">
                <OrderTrends className="w-full" ></OrderTrends>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
