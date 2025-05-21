import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button, Menu, MenuItem, Divider } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import EditDiscountForm from "./EditDiscountForm";

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
  // State for menu per row
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [activeRowId, setActiveRowId] = useState(null);

  // Is Discount Expired
  const isDateExpired = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    return expiry < today;
  };

  // Handle menu open
  const handleMenuClick = (event, discountId) => {
    setMenuAnchorEl(event.currentTarget);
    setActiveRowId(discountId);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setActiveRowId(null);
  };

  return (
    <motion.div
      className="Discounts-table my-4 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              id
            </th>
            <th
              scope="col"
              className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              code
            </th>
            <th
              scope="col"
              className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              percentage (%)
            </th>
            <th
              scope="col"
              className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              start date
            </th>
            <th
              scope="col"
              className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              end date
            </th>
            <th
              scope="col"
              className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              status
            </th>
            <th
              scope="col"
              className="py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {discounts.length > 0 ? (
            discounts.map((discount) => (
              <tr
                key={discount.id}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-gray-900 font-medium">
                  {discount.id}
                </td>
                <td className="py-4 text-gray-900 font-mono text-sm">
                  {discount.code}
                </td>
                <td className="py-4 text-gray-600 ">{discount.percentage}%</td>
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
                <td className="py-4 text-center text-gray-900 font-mono text-sm">
                  <Button
                    id={`action-button-${discount.id}`}
                    aria-controls={activeRowId === discount.id ? "action-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={activeRowId === discount.id ? "true" : undefined}
                    onClick={(event) => handleMenuClick(event, discount.id)}
                    variant="contained"
                    size="small"
                    className="bg-gray-100 hover:bg-blue-500 text-gray-700"
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Actions
                  </Button>

                  <Menu
                    id="action-menu"
                    anchorEl={menuAnchorEl}
                    open={activeRowId === discount.id}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      "aria-labelledby": `action-button-${discount.id}`,
                    }}
                    PaperProps={{
                      elevation: 3,
                      className: "mt-1 rounded-lg shadow-lg"
                    }}
                  >
                    <MenuItem 
                      onClick={() => {
                        onEdit(discount);
                        handleMenuClose();
                      }} 
                      className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50"
                    >
                      <EditIcon className="text-blue-600" />
                      <span className="text-gray-700">Edit Discount</span>
                    </MenuItem>
                    <Divider className="my-1" />
                    <MenuItem
                      onClick={() => {
                        onDelete(discount.id);
                        handleMenuClose();
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-red-50"
                    >
                      <DeleteIcon className="text-red-600" />
                      <span className="text-gray-700">Delete Discount</span>
                    </MenuItem>
                    {!isDateExpired(discount.endDate) && (
                      <>
                        <Divider className="my-1" />
                        <MenuItem
                          onClick={() => {
                            onSwitchStatus(discount.id);
                            handleMenuClose();
                          }}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-green-50"
                        >
                          {discount.status === 'Active' ? (
                            <>
                              <PowerOffIcon className="text-orange-600" />
                              <span className="text-gray-700">Deactivate Discount</span>
                            </>
                          ) : (
                            <>
                              <PowerSettingsNewIcon className="text-green-600" />
                              <span className="text-gray-700">Activate Discount</span>
                            </>
                          )}
                        </MenuItem>
                      </>
                    )}
                  </Menu>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-4 py-4 text-left text-gray-500">
                No Discounts found
              </td>
            </tr>
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
    </motion.div>
  );
}

