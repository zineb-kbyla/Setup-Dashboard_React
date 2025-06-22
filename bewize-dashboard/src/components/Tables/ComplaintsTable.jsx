import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { tableVariants, rowVariants } from "../../variants/animations";
import { useNavigate } from "react-router-dom";

export default function ComplaintsTable({ complaints, onViewDetails, onAction }) {
  const navigate = useNavigate();

  const handleViewDetails = (complaint) => {
    // Add a mock originalMessage if not present
    const complaintWithMessage = {
      ...complaint,
      originalMessage: complaint.originalMessage || "Ceci est un message original d'exemple pour la réclamation." 
    };
    navigate("/complaint-details", { state: { complaint: complaintWithMessage } });
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="overflow-hidden"
    >
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">User</th>
            <th className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Type</th>
            <th className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">View</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {complaints.length > 0 ? (
            complaints.map((complaint, index) => (
              <motion.tr
                key={complaint.id}
                variants={rowVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    {complaint.userAvatar && (
                      <img
                        className="rounded-full w-8 h-8 object-cover border-2 border-gray-100"
                        src={complaint.userAvatar}
                        alt={complaint.userName + " avatar"}
                      />
                    )}
                    <div>
                      <h2 className="font-medium text-md text-gray-900">{complaint.userName}</h2>
                      <p className="text-gray-600 text-sm">{complaint.userEmail}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">{complaint.type}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                    complaint.status === 'Open' ? 'bg-yellow-100 text-yellow-800' :
                    complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleViewDetails(complaint)}
                      className="flex items-center text-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
                      aria-label={`View details for complaint ${complaint.id}`}
                    >
                      <FontAwesomeIcon icon={faEye} size="sm" />
                      <span>View</span>
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr variants={rowVariants} initial="hidden" animate="visible">
              <td colSpan="4" className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-medium">No complaints found</span>
                  <span className="text-sm text-gray-400 mt-1">No complaints to display</span>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );
} 