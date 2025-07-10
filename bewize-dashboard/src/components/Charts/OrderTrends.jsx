import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart } from "@mui/x-charts/BarChart";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import OrderDetailsModal from "../Modals/OrderDetailsModal";

export default function OrderTrends({ data }) {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMonth, setModalMonth] = useState(0);

  const handleChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleBarClick = (params) => {
    const monthIndex = params.dataIndex;
    setModalMonth(monthIndex);
    setModalOpen(true);
  };

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

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
            Yearly Statistics 📈
          </h2>
          <FormControl
            size="small"
            sx={{
              minWidth: 120,
              marginRight: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "0.5rem",
                backgroundColor: "white",
                height: "40px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3b82f6",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#3b82f6",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#6b7280",
                fontSize: "0.875rem",
                "&.Mui-focused": {
                  color: "#3b82f6",
                },
              },
              "& .MuiSelect-select": {
                padding: "6px 14px",
                fontSize: "0.875rem",
              },
            }}
          >
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-label"
              id="year-select"
              value={selectedYear}
              label="Year"
              onChange={handleChange}
              input={<OutlinedInput label="Year" />}
            >
              <MenuItem value="2018">2018</MenuItem>
              <MenuItem value="2019">2019</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              <MenuItem value="2022">2022</MenuItem>
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
              <MenuItem value="2025">2025</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Modal for daily details */}
        <OrderDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          modalMonth={modalMonth}
          monthNames={monthNames}
        />
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
              data: data.orders[selectedYear],
              label: "Orders",
              stack: "A",
            },
            {
              data: data.subscriptions[selectedYear],
              label: "Subscriptions",
              stack: "A",
            },
          ]}
          borderRadius={10}
          height={350}
          onItemClick={handleBarClick}
        />
      </motion.div>

    </>
  );
}
