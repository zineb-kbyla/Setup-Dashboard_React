import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { cardVariants, buttonVariants } from "../variants/animations";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}) {
  return (
    <motion.div 
      className="relative w-full"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10 py-2 w-full rounded-xl border border-gray-200 
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
            transition-all duration-200 ease-in-out shadow-sm
            placeholder:text-gray-400 text-gray-700"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400"
          size="sm"
        />
        {searchTerm && (
          <motion.button
            onClick={() => onSearchChange({ target: { value: "" } })}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 transition-colors duration-200"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
