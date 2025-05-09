import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import {
  faMagnifyingGlass,
  faEye,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";
import SubscriptionRow from "../components/SubscriptionRow";

const mockSubscriptions = [
  {
    id: "SUB-001",
    startDate: "2023-11-15",
    endDate: "2024-11-15",
    orderId: "ORD-001",
  },
  {
    id: "SUB-002",
    startDate: "2023-11-16",
    endDate: "2024-11-16",
    orderId: "ORD-002",
  },
  {
    id: "SUB-003",
    startDate: "2023-11-17",
    endDate: "2024-11-17",
    orderId: "ORD-003",
  },
  {
    id: "SUB-004",
    startDate: "2023-11-18",
    endDate: "2024-11-18",
    orderId: "ORD-004",
  },
  {
    id: "SUB-005",
    startDate: "2023-11-19",
    endDate: "2024-11-19",
    orderId: "ORD-005",
  },
];

export default function Subscriptions() {
  const navigate = useNavigate();

  // Side Bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalSubscriptions = mockSubscriptions.length;
  const totalPages = Math.ceil(totalSubscriptions / itemsPerPage);

  // Filter By State
  const [open, setOpen] = React.useState(false);

  // Filter Options
  const [filters, setFilters] = useState({
    startDate: "",
  });

  // Handle Filter Change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle Open Filter Button
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close Filter Button
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  // Filter & Search Algorithm
  const filteredSubscriptions = mockSubscriptions;

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSubscriptions = filteredSubscriptions.slice(
    startIndex,
    endIndex
  );

  // Animations
  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top navbar */}
      <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
        <Navbar onToggleSidebar={toggleSidebar} />
      </motion.div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
        </motion.div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <motion.div
            className="Subscriptions flex flex-col w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="header flex flex-col justify-start gap-4"
            >
              <h1 className="font-semibold text-2xl flex items-center gap-2">
                <FontAwesomeIcon icon={faHistory} className="text-gray-600" />
                All Subscriptions
              </h1>
              <div className="flex-row justify-between gap-2">
                <div className="w-full flex flex-row justify-start items-center gap-2">
                  <div className="relative w-full md:w-2/5">
                    <input
                      type="text"
                      placeholder="Search for Subscriptions"
                      className="pl-10 p-2 w-full rounded-lg border border-gray-300 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size="sm"
                    />
                  </div>
                  <div>
                    <Button onClick={handleClickOpen} className="">
                      Filter By
                    </Button>
                    <Dialog
                      disableEscapeKeyDown
                      open={open}
                      onClose={handleClose}
                    >
                      <DialogTitle>Fill the form</DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{ display: "flex", flexWrap: "wrap" }}
                        >
                          <FormControl sx={{ m: 1, minWidth: 160 }}>
                            <InputLabel htmlFor="demo-dialog-native">
                              Status
                            </InputLabel>
                            <Select
                              native
                              value={filters.status}
                              onChange={(e) =>
                                handleFilterChange("status", e.target.value)
                              }
                              input={
                                <OutlinedInput
                                  label="Status"
                                  id="demo-dialog-native"
                                />
                              }
                            >
                              <option aria-label="None" value="" />
                              <option value={"paid"}>Paid</option>
                              <option value={"unpaid"}>Unpaid</option>
                            </Select>
                          </FormControl>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                  <div className="ml-auto">
                    <button className="mx-2 border rounded-md shadow-sm hover:bg-blue-400 p-2 bg-blue-600 text-white font-semibold text-sm">
                      Create Subscription +
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="Subscriptions-table my-4 overflow-x-auto"
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
                      order id
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedSubscriptions.length > 0 ? (
                    paginatedSubscriptions.map((subscription) => (
                      <SubscriptionRow
                        key={subscription.id}
                        subscription={subscription}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No Subscriptions found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="7" className="px-4 py-4">
                      <div className="flex justify-center">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
