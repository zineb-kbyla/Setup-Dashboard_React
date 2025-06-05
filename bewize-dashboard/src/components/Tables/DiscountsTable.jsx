import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import ToggleOffIcon from "@mui/icons-material/ToggleOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditDiscountForm from "../Forms/EditDiscountForm";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { tableVariants, rowVariants } from "../../variants/animations";
import { useNavigate } from "react-router-dom";

export default function DiscountsTable({
  discounts,
  onEdit,
  onDelete,
  onSwitchStatus,
  showEditForm,
  selectedDiscount,
  handleEditChange,
  handleEditSubmit,
  setShowEditForm,
}) {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [discountToDelete, setDiscountToDelete] = useState(null);

  // Is Discount Expired
  const isDateExpired = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry < today;
  };

  // Handle delete click
  const handleDeleteClick = (discountId) => {
    setDiscountToDelete(discountId);
    setDeleteModalOpen(true);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (discountToDelete) {
      onDelete(discountToDelete);
      setDeleteModalOpen(false);
      setDiscountToDelete(null);
    }
  };

  // Handle row click
  const handleRowClick = (discountId) => {
    navigate(`/discounts/${discountId}`);
  };

  return (
    <motion.div
      className="Discounts-table overflow-x-auto"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              id
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              code
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              school
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              percentage (%)
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              start date
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              end date
            </th>
            <th
              scope="col"
              className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              status
            </th>
            <th
              scope="col"
              className="py-4 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
            >
              action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {discounts.length > 0 ? (
            discounts.map((discount, index) => (
              <motion.tr
                key={discount.id}
                variants={rowVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.05 }}
                className="bg-white border-b hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleRowClick(discount.id)}
              >
                <td className="py-4 px-4 text-gray-900 font-medium hover:text-blue-600 transition-colors">
                  {discount.id}
                </td>
                <td className="py-4 text-gray-900 font-mono text-sm px-3 rounded hover:text-blue-600 transition-colors">
                  {discount.code}
                </td>
                <td className="py-4 text-gray-600">
                  {discount.schoolName}
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                    {discount.percentage}%
                  </span>
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(discount.startDate).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-600">
                  {new Date(discount.endDate).toLocaleDateString()}
                </td>
                <td>
                  {isDateExpired(discount.endDate) ? (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs text-center">
                      Expired
                    </span>
                  ) : discount.status === "Inactive" ? (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs text-center">
                      {discount.status}
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs text-center">
                      {discount.status}
                    </span>
                  )}
                </td>
                <td className="py-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-center gap-1">
                    <Tooltip title="View Details" arrow placement="top">
                      <IconButton
                        onClick={() => handleRowClick(discount.id)}
                        size="small"
                        color="info"
                        aria-label="view details"
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Discount" arrow placement="top">
                      <IconButton
                        onClick={() => onEdit(discount)}
                        size="small"
                        color="primary"
                        aria-label="edit"
                        className="hover:bg-blue-50 transition-colors duration-200"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Discount" arrow placement="top">
                      <IconButton
                        onClick={() => handleDeleteClick(discount.id)}
                        size="small"
                        color="error"
                        aria-label="delete"
                        className="hover:bg-red-50 transition-colors duration-200"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <div className="w-8">
                      {!isDateExpired(discount.endDate) && (
                        <Tooltip 
                          title={discount.status === 'Active' ? 'Deactivate Discount' : 'Activate Discount'} 
                          arrow 
                          placement="top"
                        >
                          <IconButton
                            onClick={() => onSwitchStatus(discount.id)}
                            size="small"
                            color={discount.status === 'Active' ? 'warning' : 'success'}
                            aria-label={discount.status === 'Active' ? 'deactivate' : 'activate'}
                            className={`hover:bg-${discount.status === 'Active' ? 'orange' : 'green'}-50 transition-colors duration-200`}
                          >
                            {discount.status === 'Active' ? 
                              <ToggleOffIcon fontSize="small" /> : 
                              <ToggleOnIcon fontSize="small" />
                            }
                          </IconButton>
                        </Tooltip>
                      )}
                    </div>
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
                  <span className="text-lg font-medium">No Discounts found</span>
                  <span className="text-sm text-gray-400 mt-1">Add a new discount to get started</span>
                </div>
              </td>
            </motion.tr>
          )}
        </tbody>
      </table>

      {showEditForm && selectedDiscount && (
        <EditDiscountForm
          showEditForm={showEditForm}
          setShowEditForm={setShowEditForm}
          selectedDiscount={selectedDiscount}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setDiscountToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Discount"
        message="Are you sure you want to delete this discount? This action cannot be undone."
      />
    </motion.div>
  );
}

