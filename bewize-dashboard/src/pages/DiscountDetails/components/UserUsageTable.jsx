import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollarSign,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { tableVariants, rowVariants } from "../../../variants/animations";
import FilterByButton from "../../../components/FilterByButton";
import Pagination from "../../../components/Pagination";
import SearchBar from "../../../components/SearchBar";

const UserUsageTable = ({
  currentItems,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  currentPage,
  setCurrentPage,
  totalPages,
  indexOfFirstItem,
  indexOfLastItem,
  filteredUsers,
  handleSort,
  sortConfig,
  rowsPerPage,
  handleChangeRowsPerPage,
}) => {
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col gap-4">
          {/* Top Section with Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Users Who Used This Discount</h2>
          </div>

          {/* Filters and Search Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-1 gap-4">
              {/* Search */}
              <div className="w-1/3">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                />
              </div>
              {/* Status Filter */}
              <FilterByButton
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={statusOptions}
              />
              {/* Pagination */}
              <div className="flex-1">
                <Pagination
                  page={currentPage - 1}
                  handleChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  count={filteredUsers.length}
                />
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th
                scope="col"
                className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("usageCount")}
              >
                Usage Count
                {sortConfig.key === "usageCount" && (
                  <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
              <th
                scope="col"
                className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("totalSavings")}
              >
                Total Savings
                {sortConfig.key === "totalSavings" && (
                  <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
              <th
                scope="col"
                className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("lastUsed")}
              >
                Last Used
                {sortConfig.key === "lastUsed" && (
                  <span className="ml-1">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
              <th scope="col" className="py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border-b hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {user.usageCount}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                      <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
                      {user.totalSavings.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 text-gray-600">
                    {new Date(user.lastUsed).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={user.status === "Active" ? faCircleCheck : faCircleXmark}
                        className={`mr-1 ${
                          user.status === "Active" ? "text-green-500" : "text-gray-500"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                
                </motion.tr>
              ))
            ) : (
              <motion.tr
                variants={rowVariants}
                initial="hidden"
                animate="visible"
              >
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500 bg-gray-50">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-lg font-medium">No users found</span>
                    <span className="text-sm text-gray-400 mt-1">Try adjusting your search or filter criteria</span>
                  </div>
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default UserUsageTable; 