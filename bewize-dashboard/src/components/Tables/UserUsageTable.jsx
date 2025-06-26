import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faDollarSign,
  faCircleCheck,
  faCircleXmark,
  faSort,
  faSortUp,
  faSortDown,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { tableVariants, rowVariants } from "../../variants/animations";
import FilterByButton from "../FilterByButton";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";

// School logo mapping
const schoolLogos = {
  "Groupe Scolaire L'initiale": "/images/schools/initiale.png",
  "Groupe Scolaire Lavoisier": "/images/schools/lavoisier.png",
  "Groupe Scolaire Tangerine": "/images/schools/tangerine.png",
  "Groupe Scolaire Al Jabr": "/images/schools/aljabr.png",
  "Bewize": "/images/schools/bewize.png"
};

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
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  const handleViewDetails = (user) => {
    const completeUser = {
      ...user,
      first_name: user.name.split(" ")[0],
      last_name: user.name.split(" ").slice(1).join(" "),
      phone: "+212612345678",
      cne: "J130040565",
      gender: "Male",
      registrationDate: new Date().toLocaleDateString(),
      avatar: "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&background=random",
      birthday: "2000-01-01",
      last_login: new Date().toISOString(),
      parent_id: 101,
      level_id: 3,
      school_id: 5,
      school: user.school || "Groupe Scolaire L'initiale",
      school_image: schoolLogos[user.school] || "/images/schools/initiale.png",
      finished_courses_count: 12,
      level_school_id: 35,
      classroom_id: 7,
      location_country: "Morocco",
      device_type: "Android",
      last_visit: new Date().toISOString(),
    };
    navigate("/user", { state: { user: completeUser } });
  };

  const statusOptions = [
    { value: "all", label: "All Users" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return faSort;
    return sortConfig.direction === "asc" ? faSortUp : faSortDown;
  };

  // Sample data for demonstration
  const sampleUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      usageCount: 3,
      totalSavings: 150.00,
      lastUsed: "2024-03-15",
      school: "Groupe Scolaire L'initiale"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      usageCount: 2,
      totalSavings: 100.00,
      lastUsed: "2024-03-14",
      school: "Groupe Scolaire Lavoisier"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      usageCount: 1,
      totalSavings: 50.00,
      lastUsed: "2024-03-13",
      school: "Groupe Scolaire Tangerine"
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      usageCount: 4,
      totalSavings: 200.00,
      lastUsed: "2024-03-16",
      school: "Groupe Scolaire Al Jabr"
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      usageCount: 2,
      totalSavings: 100.00,
      lastUsed: "2024-03-12",
      school: "Bewize"
    }
  ];

  // Use sample data for demonstration
  const displayItems = currentItems || sampleUsers;

  return (
    <motion.div
      variants={tableVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-xl shadow-sm border border-gray-100"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col gap-6">
          {/* Top Section with Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-gray-900">Users Who Used This Discount</h2>
          </div>

          {/* Filters and Search Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-1 gap-4">
              {/* Search */}
              <div className="w-1/3 flex items-center">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                />
              </div>
              {/* Status Filter */}
              <div className="flex items-center">
                <FilterByButton
                  label="Status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  options={statusOptions}
                  icon={faCircleCheck}
                />
              </div>
              {/* Pagination */}
              <div className="flex-1">
                <Pagination
                  page={currentPage - 1}
                  handleChangePage={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  count={filteredUsers.length}
                  labelDisplayedRows={({ from, to, count }) => `${from}-${to} of ${count}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-4 px-6 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="py-4 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                School
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                Usage Count
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                Total Savings
              </th>
              <th
                scope="col"
                className="py-4 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider"
              >
                Last Used
              </th>
              <th scope="col" className="py-4 px-6 text-center text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayItems.length > 0 ? (
              displayItems.map((user, index) => (
                <motion.tr
                  key={user.id}
                  variants={rowVariants}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff&bold=true&size=40`}
                        alt={`${user.name}'s avatar`}
                        className="h-10 w-10 rounded-full object-cover border-2 border-gray-100"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <img 
                        src={schoolLogos[user.school] || "/images/schools/initiale.png"} 
                        alt={`${user.school || "School"} logo`}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/schools/initiale.png";
                        }}
                      />
                      {user.school || "Groupe Scolaire L'initiale"}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700" >
                      {user.usageCount}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
                      <FontAwesomeIcon icon={faDollarSign} className="mr-1" />
                      {user.totalSavings.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <span className="text-gray-600">
                        {new Date(user.lastUsed).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleViewDetails(user)}
                        className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 transition-colors duration-200"
                        aria-label={`View details for ${user.name}`}
                      >
                        <VisibilityIcon fontSize="small" />
                      </button>
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
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="p-3 bg-gray-50 rounded-full mb-4">
                      <FontAwesomeIcon icon={faSearch} className="text-gray-400 text-xl" />
                    </div>
                    <span className="text-lg font-medium text-gray-900">No users found</span>
                    <span className="text-sm text-gray-500 mt-1">Try adjusting your search or filter criteria</span>
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