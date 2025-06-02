import React, { useState } from "react";
import { motion } from "framer-motion";
import mockUsers from "../data/mockUsers";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import UsersTable from "../components/Tables/UsersTable";
import UserOrdersTable from "../components/Tables/UserOrdersTable";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import { 
  faUsers, 
  faMars, 
  faVenus, 
  faStar, 
  faMobileScreen, 
  faAppleWhole 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Users() {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // Pagination 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Total Users
  const totalUsers = mockUsers.length;

  // Handle Page Change 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle Change Rows Per Page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter Options
  const [filters, setFilters] = useState({
    gender: "",
    device_type: "",
    level: "",
  });
  
  // Handle Filter Change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle Reset Filter
  const handleResetFilter = (filterName) => {
    setFilters((prev) => ({ ...prev, [filterName]: "" }));
  };

  // Filter & Search Algorithm
  const filteredUsers = mockUsers
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (user) =>
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.level || user.level_id === parseInt(filters.level)) &&
        (!filters.device_type || user.device_type === filters.device_type)
    );

  // Displayed User in paginated page
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <DashboardLayout>
      <PageTitle title={'All Users'} icon={faUsers} />
      <div className="flex flex-col items-center md:flex-row gap-4 mb-3">
        <div className="w-full md:w-1/3">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users by name or email..."
          />
        </div>
        <div className="flex-1 flex flex-wrap gap-1 items-center justify-between">
          <div className="flex">
            <FilterByButton
              label="Gender"
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              options={[
                { value: "Male", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMars} className="text-blue-500" /> Male</span> },
                { value: "Female", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faVenus} className="text-pink-500" /> Female</span> },
              ]}
              onReset={() => handleResetFilter("gender")}
            />

            <FilterByButton
              label="Device Type"
              value={filters.device_type}
              onChange={(e) => handleFilterChange("device_type", e.target.value)}
              options={[
                { value: "Android", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMobileScreen} className="text-green-500" /> Android</span> },
                { value: "iOS", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faAppleWhole} className="text-gray-700" /> iOS</span> },
              ]}
              onReset={() => handleResetFilter("device_type")}
            />
            <FilterByButton
              label="Level"
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              options={[
                { value: "1", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-yellow-400" /> Level 1</span> },
                { value: "2", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-yellow-500" /> Level 2</span> },
                { value: "3", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-orange-500" /> Level 3</span> },
                { value: "4", label: <span className="flex items-center gap-2"><FontAwesomeIcon icon={faStar} className="text-red-500" /> Level 4</span> },
              ]}
              onReset={() => handleResetFilter("level")}
            />
          </div>
          
          <Pagination
            page={page}
            handleChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            count={totalUsers}
          />
        </div>
      </div>

      {/* Users Table */}
      <UsersTable users={paginatedUsers} onUserSelect={setSelectedUser} />
    </DashboardLayout>
  );
}
