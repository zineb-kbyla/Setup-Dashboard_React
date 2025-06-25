import React, { useState } from "react";
import { motion } from "framer-motion";
import { BarChart } from "@mui/x-charts/BarChart";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import { BarChart as MUIBarChart } from '@mui/x-charts/BarChart';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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

  // Mock daily data for demonstration
  const getMockDailyData = (monthIndex) => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      orders: Math.floor(Math.random() * 100) + 10,
      subscriptions: Math.floor(Math.random() * 50) + 5,
    }));
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
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl relative transition-all duration-300 overflow-hidden">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-red-400 rounded-full w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-red-50 transition-all z-10"
                aria-label="Close details modal"
              >
                &times;
              </button>
              <div className="p-4">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 text-center">Details for {monthNames[modalMonth]}</h3>
                <p className="text-md text-gray-500 mb-6 text-center">Daily breakdown of Orders and Subscriptions</p>
                {/* Totals */}
                <div className="flex justify-center gap-8 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span>
                    <span className="font-semibold text-gray-700">Orders:</span>
                    <span className="font-bold text-blue-600">{getMockDailyData(modalMonth).reduce((sum, d) => sum + d.orders, 0)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="font-semibold text-gray-700">Subscriptions:</span>
                    <span className="font-bold text-purple-600">{getMockDailyData(modalMonth).reduce((sum, d) => sum + d.subscriptions, 0)}</span>
                  </div>
                </div>
                <div className="w-full h-96 flex items-center justify-center">
                  <MUIBarChart
                    dataset={getMockDailyData(modalMonth)}
                    xAxis={[{ scaleType: 'band', dataKey: 'day', label: 'Day' }]}
                    series={[
                      { dataKey: 'orders', label: 'Orders', color: '#3b82f6', highlightScope: { highlighted: 'series', faded: 'global' } },
                      { dataKey: 'subscriptions', label: 'Subscriptions', color: '#a21caf', highlightScope: { highlighted: 'series', faded: 'global' } },
                    ]}
                    height={300}
                    sx={{
                      '.MuiChartsAxis-label': { fontWeight: 600, fill: '#374151' },
                      '.MuiChartsLegend-root': { mt: 2, display: 'flex', justifyContent: 'center', gap: 3 },
                      '.MuiBarElement-root:hover': { filter: 'brightness(1.2)', stroke: '#6366f1', strokeWidth: 2 },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
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
      {/* Add fade-in animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
