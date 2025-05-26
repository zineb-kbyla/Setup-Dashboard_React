import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
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
            <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Start Date
            </th>
            <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              End Date
            </th>
            <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th scope="col" className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
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
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-gray-900 font-medium">
                  {subscription.id}
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-900 font-mono text-sm">
                  {subscription.orderId}
                </td>
                <td>
                  {isDateExpired(subscription.endDate) ? (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                      Expired
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Active
                    </span>
                  )}
                </td>
                <td className="py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <IconButton
                      onClick={() => onEdit(subscription)}
                      size="small"
                      className="text-blue-600 hover:bg-blue-50"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteClick(subscription.id)}
                      size="small"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <DeleteIcon />
                    </IconButton>
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
              <td colSpan="6" className="px-4 py-4 text-left text-gray-500">
                No subscriptions found
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