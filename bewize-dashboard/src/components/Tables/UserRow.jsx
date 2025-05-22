import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export default function UserRow({ user }) {
  // Navigation
  const navigate = useNavigate();

  // User Details Rediriction
  const handleViewDetails = (user) => {
    navigate("/user", { state: { user } });
  };

  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-10 h-10"
            src={user.avatar}
            alt={`${user.name}'s avatar`}
          />
          <div>
            <h2 className="font-semibold text-md">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4">{user.phone}</td>
      <td className="py-4">{user.cne}</td>
      <td className="py-4">{user.gender}</td>
      <td className="py-4">{user.registrationDate}</td>
      <td className="py-4 text-center">
        <button
          onClick={() => handleViewDetails(user)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          aria-label={`View details for ${user.name}`}
        >
          <FontAwesomeIcon icon={faEye} size="sm" />
          <span>View</span>
        </button>
      </td>
    </tr>
  );
}
