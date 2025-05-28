import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { isDateExpired } from "../../utils/subscriptionUtils";
import EditSubscriptionForm from "../Forms/EditSubscriptionForm";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { tableVariants, rowVariants } from "../../variants/animations";

export default function SubscriptionsTable({
  subscriptions,
  onEdit,
  onDelete,
  showEditForm,
  selectedSubscription,
  handleEditChange,
  handleEditSubmit,
  setShowEditForm,
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [subscriptionToDelete, setSubscriptionToDelete] = useState(null);

  const handleDeleteClick = (subscriptionId) => {
    setSubscriptionToDelete(subscriptionId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (subscriptionToDelete) {
      onDelete(subscriptionToDelete);
      setDeleteModalOpen(false);
      setSubscriptionToDelete(null);
    }
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
            <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Customer
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Start Date
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              End Date
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Plan Type
            </th>
            <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription, index) => (
              <motion.tr
                key={subscription.id}
                variants={rowVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-4 px-6 text-gray-900 font-medium">
                  {subscription.id}
                </td>
                <td className="py-4 text-gray-900">
                  <div className="flex flex-col">
                    <span className="font-medium">{subscription.customer.name || 'N/A'}</span>
                    <span className="text-sm text-gray-500">{subscription.customer.email || 'N/A'}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-900 font-mono text-sm  px-3 rounded">
                  {subscription.orderId}
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full
                    ${subscription.planType === "Year" ? "bg-purple-100 text-purple-800" :
                      subscription.planType === "Semester" ? "bg-blue-100 text-blue-800" :
                      subscription.planType === "Quarter" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-800"}`}>
                    {subscription.planType}
                  </span>
                </td>
                <td>
                  {isDateExpired(subscription.endDate) ? (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Expired
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Active
                    </span>
                  )}
                </td>
                <td className="py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <Tooltip title="Edit Subscription" arrow placement="top">
                      <IconButton
                        onClick={() => onEdit(subscription)}
                        size="small"
                        color="primary"
                        aria-label="edit"
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Subscription" arrow placement="top">
                      <IconButton
                        onClick={() => handleDeleteClick(subscription.id)}
                        size="small"
                        color="error"
                        aria-label="delete"
                        className="hover:bg-red-50 transition-colors duration-200"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                </td>
              </motion.tr>
            ))
          ) : (
            <motion.tr
              variants={rowVariants}
              initial="hidden"
              animate="visible"
            >
              <td colSpan="7" className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-lg font-medium">No Subscriptions found</span>
                  <span className="text-sm text-gray-400 mt-1">Add a new subscription to get started</span>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>

      {showEditForm && selectedSubscription && (
        <EditSubscriptionForm
          selectedSubscription={selectedSubscription}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          setShowEditForm={setShowEditForm}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSubscriptionToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Subscription"
        message="Are you sure you want to delete this subscription? This action cannot be undone."
      />
    </motion.div>
  );
} 