import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faSort,
  faSortUp,
  faSortDown,
  faExclamationTriangle,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { tableVariants, rowVariants } from "../../variants/animations";

const ComplaintsTable = ({ complaints, onComplaintSelect }) => {
  const navigate = useNavigate();

  const getStatusIcon = (status) => {
    switch (status) {
      case "Open":
        return <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-500" />;
      case "In Progress":
        return <FontAwesomeIcon icon={faSpinner} className="text-blue-500" />;
      case "Resolved":
        return <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />;
      case "Closed":
        return <FontAwesomeIcon icon={faTimesCircle} className="text-gray-500" />;
      default:
        return <FontAwesomeIcon icon={faClock} className="text-gray-400" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Closed":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (complaint) => {
    navigate(`/complaints/${complaint.id}`, { state: { complaint } });
  };

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Complaint
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {complaints.map((complaint, index) => (
              <motion.tr
                key={complaint.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getStatusIcon(complaint.status)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {complaint.title}
                      </p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {complaint.description}
                      </p>
                      {complaint.attachments && complaint.attachments.length > 0 && (
                        <div className="flex items-center mt-1">
                          <FontAwesomeIcon icon={faPaperclip} className="text-gray-400 text-xs mr-1" />
                          <span className="text-xs text-gray-500">
                            {complaint.attachments.length} attachment{complaint.attachments.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={complaint.user.avatar}
                        alt={complaint.user.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(complaint.user.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {complaint.user.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {complaint.user.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(complaint.status)}`}>
                    {getStatusIcon(complaint.status)}
                    <span className="ml-1">{complaint.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {complaint.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {complaint.assignedTo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(complaint.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleViewDetails(complaint)}
                    className="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faEye} className="mr-1" />
                    View
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {complaints.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg font-medium">No complaints found</div>
          <div className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria</div>
        </div>
      )}
    </motion.div>
  );
};

export default ComplaintsTable; 