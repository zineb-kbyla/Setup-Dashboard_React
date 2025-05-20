import React, { useState } from "react";
import { motion } from "framer-motion";
import mockUsers from "../data/mockUsers";
import PageTitle from "../components/PageTitle";
import SearchBar from "../components/SearchBar";
import UsersTable from "../components/UsersTable";
import Pagination from "../components/Pagination";
import DashboardLayout from "../layouts/DashboardLayout";
import FilterByButton from "../components/FilterByButton";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

export default function Users() {
  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination 
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const startIndex = page  * rowsPerPage;
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
    city: "",
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
        (!filters.gender || user.gender              === filters.gender) &&
        (!filters.level  || user.level_id.toString() === filters.level)  &&
        (!filters.city   || user.location_city       === filters.city)
    );

    // Displayed User in paginated page
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  
  return (
    <DashboardLayout>
       <PageTitle title={'All Users'} icon={faUsers} />
        <div className="flex flex-col items-center md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users by name or email..."
            />
          </div>
          <div className="flex-1 flex flex-wrap gap-1 items-center">
            <FilterByButton
              label="Gender"
              value={filters.gender}
              onChange={(e) => handleFilterChange("gender", e.target.value)}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              onReset={() => handleResetFilter("gender")}
            />

            <FilterByButton
              label="City"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              options={[
                { value: "Casablanca", label: "Casablanca" },
                { value: "Rabat", label: "Rabat" },
                { value: "Marrakech", label: "Marrakech" },
              ]}
              onReset={() => handleResetFilter("city")}
            />
            <FilterByButton
              label="Level"
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              options={[
                { value: "1", label: "Level 1" },
                { value: "2", label: "Level 2" },
                { value: "3", label: "Level 3" },
              ]}
              onReset={() => handleResetFilter("level")}
            />
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
        <UsersTable users={paginatedUsers} />
  
    </DashboardLayout>
  );
}
