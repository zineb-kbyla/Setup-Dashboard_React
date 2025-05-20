import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
}) {
  return (
    <div className="relative w-full">
      <div className="relative w-full">
        <input
          type="text"
          placeholder={placeholder}
          className="pl-10 pr-10 py-4 w-full rounded-xl border border-gray-200 
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
          <button
            onClick={() => onSearchChange({ target: { value: "" } })}
            className="absolute right-3.5 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <FontAwesomeIcon icon={faTimes} size="sm" />
          </button>
        )}
      </div>
    </div>
  );
}
