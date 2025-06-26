import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faExclamationTriangle,
  faClock,
  faCheckCircle,
  faTimesCircle,
  faSpinner,
  faPaperclip,
  faUser,
  faEnvelope,
  faSchool,
  faCalendarAlt,
  faTag,
  faFlag,
  faComments,
  faReply,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/DashboardLayout";
import PageTitle from "../components/PageTitle";
import { mockComplaints } from "../data/mockComplaints";

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [complaint, setComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComplaint, setEditedComplaint] = useState(null);
  const [newReply, setNewReply] = useState("");

  useEffect(() => {
    // Try to get complaint from location state first (if navigated from table)
    if (location.state?.complaint) {
      setComplaint(location.state.complaint);
      setEditedComplaint(location.state.complaint);
    } else {
      // Fallback to finding complaint by ID from mock data
      const foundComplaint = mockComplaints.find(c => c.id === parseInt(id));
      if (foundComplaint) {
        setComplaint(foundComplaint);
        setEditedComplaint(foundComplaint);
      }
    }
  }, [id, location.state]);

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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setComplaint(editedComplaint);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedComplaint(complaint);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedComplaint(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddReply = () => {
    if (newReply.trim()) {
      // In a real app, you would send this to the backend
      console.log("Adding reply:", newReply);
      setNewReply("");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      navigate("/complaints");
    }
  };

  if (!complaint) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Complaint not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/complaints")}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <PageTitle title="Complaint Details" icon={faExclamationTriangle} />
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Complaint Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Complaint Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Complaint Information</h2>
              
              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={editedComplaint.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={editedComplaint.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                      <select
                        name="status"
                        value={editedComplaint.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        name="priority"
                        value={editedComplaint.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{complaint.title}</h3>
                    <p className="text-gray-600 mt-2">{complaint.description}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(complaint.status)}`}>
                      {getStatusIcon(complaint.status)}
                      <span className="ml-1">{complaint.status}</span>
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(complaint.priority)}`}>
                      <FontAwesomeIcon icon={faFlag} className="mr-1" />
                      {complaint.priority}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      <FontAwesomeIcon icon={faTag} className="mr-1" />
                      {complaint.category}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Attachments */}
            {complaint.attachments && complaint.attachments.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FontAwesomeIcon icon={faPaperclip} />
                  Attachments ({complaint.attachments.length})
                </h3>
                <div className="space-y-2">
                  {complaint.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{attachment}</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Replies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faComments} />
                Replies
              </h3>
              
              <div className="space-y-4">
                {/* Add new reply */}
                <div className="flex gap-3">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Add a reply..."
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handleAddReply}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-end"
                  >
                    <FontAwesomeIcon icon={faReply} />
                  </button>
                </div>
                
                {/* Sample replies */}
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">Support Team</span>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-700">We're investigating this issue. Please try clearing your browser cache and let us know if the problem persists.</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">John Doe</span>
                      <span className="text-sm text-gray-500">1 hour ago</span>
                    </div>
                    <p className="text-gray-700">I've tried clearing the cache but the issue still persists. Can you please escalate this?</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - User Info & Metadata */}
          <div className="space-y-6">
            {/* User Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                User Information
              </h3>
              
              <div className="flex items-center mb-4">
                <img
                  src={complaint.user.avatar}
                  alt={complaint.user.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(complaint.user.name)}&background=random`;
                  }}
                />
                <div>
                  <h4 className="font-medium text-gray-900">{complaint.user.name}</h4>
                  <p className="text-gray-500">{complaint.user.email}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <FontAwesomeIcon icon={faEnvelope} className="text-gray-400 w-4" />
                  <span className="text-gray-700">{complaint.user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <FontAwesomeIcon icon={faSchool} className="text-gray-400 w-4" />
                  <span className="text-gray-700">{complaint.school}</span>
                </div>
              </div>
            </motion.div>

            {/* Complaint Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Details</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Complaint ID</label>
                  <p className="text-sm text-gray-900 mt-1">#{complaint.id}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Assigned To</label>
                  <p className="text-sm text-gray-900 mt-1">{complaint.assignedTo}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Created</label>
                  <p className="text-sm text-gray-900 mt-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-400" />
                    {formatDate(complaint.createdAt)}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-500">Last Updated</label>
                  <p className="text-sm text-gray-900 mt-1 flex items-center gap-2">
                    <FontAwesomeIcon icon={faClock} className="text-gray-400" />
                    {formatDate(complaint.updatedAt)}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 