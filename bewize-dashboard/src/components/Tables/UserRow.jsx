import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMobileScreen, faAppleWhole } from "@fortawesome/free-solid-svg-icons";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function UserRow({ user, variants, initial, animate, transition }) {
  // Navigation
  const navigate = useNavigate();

  // User Details Rediriction
  const handleViewDetails = (user) => {
    navigate("/user", { state: { user } });
  };

  return (
    <motion.tr
      variants={variants}
      initial={initial}
      animate={animate}
      transition={transition}
      className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
    >
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <img
            className="rounded-full w-10 h-10 object-cover border-2 border-gray-100"
            src={user.avatar}
            alt={`${user.name}'s avatar`}
          />
          <div>
            <h2 className="font-medium text-md text-gray-900">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 text-gray-600">{user.phone}</td>
      <td className="py-4">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-50 text-gray-700">
          {user.cne}
        </span>
      </td>
      <td className="py-4">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          user.gender === "Female" 
            ? "bg-pink-50 text-pink-700" 
            : "bg-blue-50 text-blue-700"
        }`}>
          {user.gender}
        </span>
      </td>
      <td className="py-4 text-gray-600">{user.registrationDate}</td>
      <td className="py-4 text-gray-600">
        <span className="flex items-center gap-2">
          <FontAwesomeIcon 
            icon={faStar} 
            className={
              user.level_id === 1 ? "text-yellow-400" :
              user.level_id === 2 ? "text-yellow-500" :
              user.level_id === 3 ? "text-orange-500" :
              user.level_id === 4 ? "text-red-500" :
              "text-gray-400"
            }
          />
          {`Level ${user.level_id}`}
        </span>
      </td>
      <td className="py-4 text-center">
        <Tooltip title="View Details" arrow placement="top">
          <IconButton
            onClick={() => handleViewDetails(user)}
            size="small"
            color="info"
            aria-label={`View details for ${user.name}`}
            className="hover:bg-blue-50 transition-colors duration-200"
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </td>
    </motion.tr>
  );
}
