import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart } from "@mui/x-charts/BarChart";

export default function OrderTrends() {
  const [selectedYear, setSelectedYear] = useState(2025);

  const yearlyOrderStats = {
    2018: [150, 170, 160, 180, 150, 170, 160, 180, 150, 170, 160, 180],
    2019: [140, 130, 160, 145, 140, 130, 160, 145, 140, 130, 160, 145],
    2020: [140, 130, 160, 145, 140, 130, 160, 145, 140, 130, 160, 145],
    2021: [200, 180, 190, 210, 200, 180, 190, 210, 200, 180, 190, 210],
    2022: [220, 210, 230, 200, 215, 205, 225, 210, 218, 212, 219, 213],
    2023: [210, 250, 240, 230, 245, 235, 225, 238, 248, 232, 241, 237],
    2024: [260, 240, 220, 250, 255, 245, 235, 250, 265, 242, 258, 249],
    2025: [270, 290, 260, 280, 275, 285, 265, 278, 288, 262, 279, 273],
  };

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={chartVariants}>
        <div className="title flex justify-between py-4 items-center">
          <h2 className="text-lg align-middle font-semibold mb-2 text-gray-800 ms-5">
            Yearly Order Statistics 📈
          </h2>
          <select
            name="month"
            id="month"
            value={selectedYear}
            onChange={handleChange}
            className="font-bold border shadow-sm rounded-lg px-4 py-2 me-2 text-sm outline-none "
          >
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
          ]}
          series={[
            {
              data: yearlyOrderStats[selectedYear],
            },
          ]}
          borderRadius={10}
          height={350}
        />
      </motion.div>
    </>
  );
}
