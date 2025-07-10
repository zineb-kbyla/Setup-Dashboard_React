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
  faBug,
  faTools,
  faCreditCard,
  faUserCog,
  faExclamationCircle,
  faQuestionCircle,
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

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "technical":
        return <FontAwesomeIcon icon={faBug} className="text-red-500" />;
      case "billing":
        return <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" />;
      case "account":
        return <FontAwesomeIcon icon={faUserCog} className="text-purple-500" />;
      case "feature request":
        return <FontAwesomeIcon icon={faTools} className="text-green-500" />;
      case "bug report":
        return <FontAwesomeIcon icon={faExclamationCircle} className="text-red-600" />;
      case "general":
        return <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-500" />;
      default:
        return <FontAwesomeIcon icon={faQuestionCircle} className="text-gray-400" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case "technical":
        return "bg-red-50 text-red-700 border-red-200";
      case "billing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "account":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "feature request":
        return "bg-green-50 text-green-700 border-green-200";
      case "bug report":
        return "bg-red-50 text-red-700 border-red-200";
      case "general":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
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
                User
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
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
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(complaint.category)}`}>
                    {getCategoryIcon(complaint.category)}
                    <span className="ml-1">{complaint.category}</span>
                  </span>
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