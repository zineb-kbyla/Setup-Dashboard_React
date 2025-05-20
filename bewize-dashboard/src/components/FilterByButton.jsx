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
    <div className={`flex items-center gap-2`}>
      <FormControl
        fullWidth
        sx={{
          m: 1,
          minWidth: 120,
          "& .MuiOutlinedInput-root": {
            borderRadius: "0.75rem",
            backgroundColor: "white",
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
            "&.Mui-focused": {
              color: "#3b82f6",
            },
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
              key={opt.value}
              value={opt.value}
              className="hover:bg-blue-50"
            >
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
