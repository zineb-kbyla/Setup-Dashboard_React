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
    onChange(event.target.value);
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
            <MenuItem
              value={opt.value}
              className="hover:bg-blue-50"
              key={opt.value}
            >
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* Reset button - only show when a value is selected */}
      {value && onReset && (
        <Tooltip title="Reset">
          <IconButton
            size="small"
            onClick={onReset}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="reset"
            data-testid={`reset-${label.toLowerCase()}-filter`}
          >
            <svg
              aria-hidden="true"
              className="svg-inline--fa fa-xmark fa-sm"
              data-icon="xmark"
              data-prefix="fas"
              focusable="false"
              role="img"
              viewBox="0 0 384 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                fill="currentColor"
              />
            </svg>
          </IconButton>
        </Tooltip>
      )}
    </motion.div>
  );
}
