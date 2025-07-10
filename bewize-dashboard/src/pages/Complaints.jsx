import React, { useState } from "react";
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
import ComplaintStatisticsCards from "../components/ComplaintStatisticsCards";
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
        <ComplaintStatisticsCards 
          statistics={{
            totalComplaints,
            openComplaints,
            resolvedComplaints
          }}
        />

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

            {/* Filters and Pagination */}
            <div className="flex flex-wrap gap-3 items-center">
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
                label="Category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                options={[
                  { value: "all", label: "All Categories" },
                  ...complaintCategories.map(category => ({ value: category, label: category }))
                ]}
                icon={faFilter}
              />

              <div className="ml-auto">
                <Pagination
                  page={currentPage - 1}
                  handleChangePage={handleChangePage}
                  rowsPerPage={itemsPerPage}
                  handleChangeRowsPerPage={handleChangeRowsPerPage}
                  count={filteredComplaints.length}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Complaints Table */}
        <ComplaintsTable complaints={currentItems} />
      </div>
    </DashboardLayout>
  );
} 