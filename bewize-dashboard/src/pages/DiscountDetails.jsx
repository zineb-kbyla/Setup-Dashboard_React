import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPercent,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import DashboardLayout from "../layouts/DashboardLayout";
import PageTitle from "../components/PageTitle";
import mockDiscounts from "../data/mockDiscounts";
import { mockUserUsage, mockStatistics } from "../data/mockUserUsage";
import StatisticsCards from "../components/StatisticsCards";
import DiscountInformation from "../pages/DiscountInformation";
import UserUsageTable from "../components/Tables/UserUsageTable";
import EditDiscountModal from "../components/Modals/EditDiscountModal";

export default function DiscountDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDiscount, setEditedDiscount] = useState(null);

  // Use mock data from the data file
  const [statistics, setStatistics] = useState(mockStatistics);
  const [userUsage, setUserUsage] = useState(mockUserUsage);

  // Pagination and filter states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: "lastUsed", direction: "desc" });

  // Filter and sort users
  const filteredUsers = userUsage
    .filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortConfig.key === "lastUsed") {
        return sortConfig.direction === "asc"
          ? new Date(a.lastUsed) - new Date(b.lastUsed)
          : new Date(b.lastUsed) - new Date(a.lastUsed);
      }
      return sortConfig.direction === "asc"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc",
    });
  };

  useEffect(() => {
    // Find the discount with the matching ID
    const foundDiscount = mockDiscounts.find((d) => d.id === id);
    if (foundDiscount) {
      setDiscount(foundDiscount);
      setEditedDiscount(foundDiscount);
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the discount
    setDiscount(editedDiscount);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDiscount(discount);
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Here you would typically make an API call to delete the discount
    navigate("/discounts");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDiscount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!discount) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">Discount not found</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-start">
          <div className="h-6 " />
          <PageTitle title="Discount Details" icon={faPercent} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          <DiscountInformation discount={discount} statistics={statistics} />
          <UserUsageTable
            currentItems={currentItems}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            indexOfFirstItem={indexOfFirstItem}
            indexOfLastItem={indexOfLastItem}
            filteredUsers={filteredUsers}
            handleSort={handleSort}
            sortConfig={sortConfig}
            rowsPerPage={itemsPerPage}
            handleChangeRowsPerPage={(e) => {
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <EditDiscountModal
        isEditing={isEditing}
        editedDiscount={editedDiscount}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleInputChange={handleInputChange}
      />
    </DashboardLayout>
  );
} 