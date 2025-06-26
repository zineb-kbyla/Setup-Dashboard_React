import React, { useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faFilter,
  faSearch,
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/DashboardLayout";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import FilterByButton from "../components/FilterByButton";
import Pagination from "../components/Pagination";
import ComplaintsTable from "../components/Tables/ComplaintsTable";
import { mockComplaints, complaintCategories, complaintPriorities, complaintStatuses } from "../data/mockComplaints";

export default function Complaints() {
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Sorting states
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });

  // Filter complaints based on search and filters
  const filteredComplaints = mockComplaints
    .filter((complaint) => {
      const matchesSearch = 
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || complaint.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
      const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      if (sortConfig.key === "createdAt") {
        return sortConfig.direction === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortConfig.key === "updatedAt") {
        return sortConfig.direction === "asc"
          ? new Date(a.updatedAt) - new Date(b.updatedAt)
          : new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      if (sortConfig.key === "title") {
        return sortConfig.direction === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      if (sortConfig.key === "user") {
        return sortConfig.direction === "asc"
          ? a.user.name.localeCompare(b.user.name)
          : b.user.name.localeCompare(a.user.name);
      }
      return sortConfig.direction === "asc"
        ? a[sortConfig.key]?.localeCompare?.(b[sortConfig.key]) || 0
        : b[sortConfig.key]?.localeCompare?.(a[sortConfig.key]) || 0;
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredComplaints.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage + 1);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setCurrentPage(1);
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return faSort;
    return sortConfig.direction === "asc" ? faSortUp : faSortDown;
  };

  // Statistics
  const totalComplaints = mockComplaints.length;
  const openComplaints = mockComplaints.filter(c => c.status === "Open").length;
  const inProgressComplaints = mockComplaints.filter(c => c.status === "In Progress").length;
  const resolvedComplaints = mockComplaints.filter(c => c.status === "Resolved").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <PageTitle title="Complaints" icon={faExclamationTriangle} />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Complaints</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{totalComplaints}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-blue-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Open</p>
                <p className="text-2xl font-semibold text-orange-600 mt-1">{openComplaints}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-xl">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-orange-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-2xl font-semibold text-blue-600 mt-1">{inProgressComplaints}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-blue-600 text-xl" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-2xl font-semibold text-green-600 mt-1">{resolvedComplaints}</p>
              </div>
              <div className="p-3 bg-green-50 rounded-xl">
                <FontAwesomeIcon icon={faExclamationTriangle} className="text-green-600 text-xl" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 min-w-0">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search complaints by title, description, or user..."
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <FilterByButton
                label="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Statuses" },
                  ...complaintStatuses.map(status => ({ value: status, label: status }))
                ]}
                icon={faFilter}
              />

              <FilterByButton
                label="Priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Priorities" },
                  ...complaintPriorities.map(priority => ({ value: priority, label: priority }))
                ]}
                icon={faFilter}
              />

              <FilterByButton
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Categories" },
                  ...complaintCategories.map(category => ({ value: category, label: category }))
                ]}
                icon={faFilter}
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <span>
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredComplaints.length)} of {filteredComplaints.length} complaints
            </span>
            <Pagination
              page={currentPage - 1}
              handleChangePage={handleChangePage}
              rowsPerPage={itemsPerPage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              count={filteredComplaints.length}
            />
          </div>
        </div>

        {/* Complaints Table */}
        <ComplaintsTable complaints={currentItems} />
      </div>
    </DashboardLayout>
  );
} 