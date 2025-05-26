import React, { useState } from "react";
import { motion } from "framer-motion";
import Metric from "../components/Metric";
import UsersStates from "../components/Charts/UsersStates";
import OrderTrends from "../components/Charts/OrderTrends";
import TopCustomers from "../components/Charts/TopCustomers";
import CategoriesStates from "../components/Charts/CategoriesStates";
import SubscriptionStates from "../components/Charts/SubscriptionStates";
import { faClipboardList, faShoppingCart, faTag, faUsers } from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/DashboardLayout";
import { subscriptionData, usersData } from "../data/chartData";

export default function Dashboard() {
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
    <DashboardLayout>
      <div className="metrics grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={metricVariants}
          custom={0}
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
          custom={1}
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
          custom={2}
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
          custom={3}
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

      <div className="charts grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          className="border rounded-lg shadow-sm my-4"
          initial="hidden"
          animate="visible"
          variants={chartVariants}
        >
          <UsersStates data={usersData} />
        </motion.div>
        <motion.div
          className="border rounded-lg shadow-sm my-4"
          initial="hidden"
          animate="visible"
          variants={chartVariants}
          transition={{ delay: 0.4 }}
        >
          <SubscriptionStates data={subscriptionData} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableVariants}
        >
          <TopCustomers />
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={tableVariants}
          transition={{ delay: 0.2 }}
        >
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
          <OrderTrends className="w-full" />
        </div>
      </motion.div>
    </DashboardLayout>
  );
}
