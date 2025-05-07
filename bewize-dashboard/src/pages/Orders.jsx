import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye, faHistory } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
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

const mockOrders = [
  {
    id: "ORD-001",
    customer: {
      name: "Youssef El Amrani",
      email: "youssef.elamrani@bewize.ma",
      avatar: "https://img.freepik.com/free-photo/portrait-young-student-smiling_23-2148586534.jpg"
    },
    status: "paid",
    amount: 99.99,
    date: "2023-11-15",
    transactionId: "TXN-789456",
    planType: "Premium"
  },
  {
    id: "ORD-002",
    customer: {
      name: "Fatima Zahra Benali",
      email: "fatima.benali@bewize.ma",
      avatar: "https://img.freepik.com/free-photo/portrait-teenager-happy-be-back-university_23-2148586575.jpg"
    },
    status: "unpaid",
    amount: 29.99,
    date: "2023-11-16",
    transactionId: "TXN-123456",
    planType: "Basic"
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mehdi El Fassi",
      email: "mehdi.elfassi@bewize.ma",
      avatar: "https://img.freepik.com/free-photo/side-view-smiley-man-carrying-books_23-2149659095.jpg"
    },
    status: "paid",
    amount: 149.99,
    date: "2023-11-17",
    transactionId: "TXN-456789",
    planType: "Enterprise"
  }
];

export default function Orders() {
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
  const totalOrders = mockOrders.length;
  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  // Filter By State
  const [open, setOpen] = React.useState(false);

  // Filter Options
  const [filters, setFilters] = useState({
    status: "",
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
  const filteredOrders = mockOrders
    .filter(
      (order) =>
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (order) =>
        (!filters.status || order.status === filters.status)
    );

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  const handleViewDetails = (order) => {
    navigate('/order', { state: { order } });
  };

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
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const OrderRow = ({ order }) => (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-10 h-10"
            src={order.customer.avatar}
            alt={`${order.customer.name}'s avatar`}
          />
          <div>
            <h2 className="font-semibold text-md">{order.customer.name}</h2>
            <p className="text-gray-600 text-sm">{order.customer.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4">
        <span
          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
          ${order.status === "paid" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
        >
          {order.status}
        </span>
      </td>
      <td className="py-4 text-gray-900">${order.amount.toFixed(2)}</td>
      <td className="py-4 text-gray-600">
        {new Date(order.date).toLocaleDateString()}
      </td>
      <td className="py-4 text-gray-600 font-mono text-sm">
        {order.transactionId}
      </td>
      <td className="py-4">
        <span
          className={`px-2 py-1 text-xs font-medium rounded
          ${
            order.planType === "Premium"
              ? "bg-purple-100 text-purple-800"
              : order.planType === "Enterprise"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {order.planType}
        </span>
      </td>
    </tr>
  );

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
            className="orders flex flex-col w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="header flex flex-col justify-start gap-4">
              <h1 className="font-semibold text-2xl flex items-center gap-2">
                <FontAwesomeIcon icon={faHistory} className="text-gray-600" />
                All Orders
              </h1>
              <div className="relative w-full flex gap-2">
                <div className="relative w-full md:w-2/5">
                  <input
                    type="text"
                    placeholder="Search for orders"
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
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="orders-table my-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Plan Type
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedOrders.length > 0 ? (
                    paginatedOrders.map((order) => (
                      <OrderRow key={order.id} order={order} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No orders found
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