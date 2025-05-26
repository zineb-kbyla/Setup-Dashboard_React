import * as React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { cardVariants } from "../variants/animations";

export default function FilterByButton({
  label,
  value,
  onChange,
  options,
  onReset,
}) {
  const handleChange = (event) => {
    onChange(event);
  };

  return (
    <motion.div 
      className={`flex items-center gap-2`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <FormControl
        fullWidth
        size="small"
        sx={{
          m: 0.5,
          minWidth: 130,
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
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={`${label}-select`}
          value={value}
          label={label}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            return (
              options.find((opt) => opt.value === selected)?.label || selected
            );
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {options.map((opt) => (
            <motion.div
              key={opt.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MenuItem
                value={opt.value}
                className="hover:bg-blue-50"
              >
                {opt.label}
              </MenuItem>
            </motion.div>
          ))}
        </Select>
      </FormControl>
    </motion.div>
  );
}
