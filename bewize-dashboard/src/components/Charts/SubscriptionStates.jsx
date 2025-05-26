import { LineChart } from "@mui/x-charts/LineChart";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function SubscriptionStates({ data }) {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("jan");

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <>
      <motion.div
        className="border rounded-lg shadow-sm "
        initial="hidden"
        animate="visible"
        variants={chartVariants}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-gray-50 py-4 rounded-xl">
          <div className="title px-4 flex justify-between items-center gap-4 mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Subscriptions by Month
            </h2>
            <div className="flex gap-2">
              <select
                name="year"
                id="year"
                value={selectedYear}
                onChange={handleYearChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="2023">2023</option>
                <option value="2024">2024</option>
              </select>
              <select
                name="month"
                id="month"
                value={selectedMonth}
                onChange={handleMonthChange}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="jan">Janvier</option>
                <option value="feb">Février</option>
                <option value="mar">Mars</option>
                <option value="apr">Avril</option>
                <option value="may">Mai</option>
                <option value="jun">Juin</option>
                <option value="jul">Juillet</option>
                <option value="aug">Août</option>
                <option value="sep">Septembre</option>
                <option value="oct">Octobre</option>
                <option value="nov">Novembre</option>
                <option value="dec">Décembre</option>
              </select>
            </div>
          </div>
          <div className="content">
            <LineChart
              xAxis={[
                {
                  id: "weeks",
                  data: ["Week 1", "Week 2", "Week 3", "Week 4"],
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  label: "Users",
                  data: data[selectedYear][selectedMonth],
                  area: true,
                  color: "#10b981",
                },
              ]}
              height={300}
              margin={{ top: 10, right: 10, bottom: 10, left: 0 }}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}
