import { LineChart } from "@mui/x-charts/LineChart";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { chartVariants } from "../../variants/dashboardVariants";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";

export default function UsersStates({ data }) {
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("jan");

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
              Users by Month
            </h2>
            <div className="flex gap-2">
              <FormControl
                size="small"
                sx={{
                  minWidth: 120,
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
                  onChange={handleYearChange}
                  input={<OutlinedInput label="Year" />}
                >
                  <MenuItem value="2023">2023</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{
                  minWidth: 120,
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
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                  labelId="month-label"
                  id="month-select"
                  value={selectedMonth}
                  label="Month"
                  onChange={handleMonthChange}
                  input={<OutlinedInput label="Month" />}
                >
                  <MenuItem value="jan">Janvier</MenuItem>
                  <MenuItem value="feb">Février</MenuItem>
                  <MenuItem value="mar">Mars</MenuItem>
                  <MenuItem value="apr">Avril</MenuItem>
                  <MenuItem value="may">Mai</MenuItem>
                  <MenuItem value="jun">Juin</MenuItem>
                  <MenuItem value="jul">Juillet</MenuItem>
                  <MenuItem value="aug">Août</MenuItem>
                  <MenuItem value="sep">Septembre</MenuItem>
                  <MenuItem value="oct">Octobre</MenuItem>
                  <MenuItem value="nov">Novembre</MenuItem>
                  <MenuItem value="dec">Décembre</MenuItem>
                </Select>
              </FormControl>
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
                  color: "#3b82f6",
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
