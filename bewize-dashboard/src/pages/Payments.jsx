import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faMagnifyingGlass,
  faHistory,
  faEdit,
  faTrash,
  faPlus,
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  OutlinedInput,
  Select,
  Menu,
  MenuItem,
} from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/material/Divider";
import {
  faCcPaypal,
  faCcVisa,
  faCcMastercard,
  faApplePay,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

const mockPayments = [
  {
    id: "TXN1001",
    user_name: "Alice Johnson",
    email: "alice@example.com",
    amount: 49.99,
    currency: "USD",
    payment_method: "Visa",
    payment_status: "Paid",
    paid_at: "2025-05-17 14:30:00",
    provider: "Stripe",
    order_id: "ORD7890",
  },
  {
    id: "TXN1002",
    user_name: "Bob Smith",
    email: "bob.smith@example.com",
    amount: 29.99,
    currency: "USD",
    payment_method: "PayPal",
    payment_status: "Pending",
    paid_at: null,
    provider: "PayPal",
    order_id: "ORD7891",
  },
  {
    id: "TXN1003",
    user_name: "Carol White",
    email: "carolw@example.com",
    amount: 79.99,
    currency: "EUR",
    payment_method: "MasterCard",
    payment_status: "Failed",
    paid_at: "2025-05-16 09:15:00",
    provider: "Stripe",
    order_id: "ORD7892",
  },
  {
    id: "TXN1004",
    user_name: "David Lee",
    email: "david.lee@example.com",
    amount: 19.99,
    currency: "USD",
    payment_method: "Apple Pay",
    payment_status: "Paid",
    paid_at: "2025-05-15 17:45:00",
    provider: "Stripe",
    order_id: "ORD7893",
  },
  {
    id: "TXN1005",
    user_name: "Emily Carter",
    email: "emily@example.com",
    amount: 99.0,
    currency: "USD",
    payment_method: "Visa",
    payment_status: "Refunded",
    paid_at: "2025-05-14 11:20:00",
    provider: "Stripe",
    order_id: "ORD7894",
  },
];

export default function Payments() {
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
  const totalpayments = mockPayments.length;
  const totalPages = Math.ceil(totalpayments / itemsPerPage);

  // Filter By State
  const [open, setOpen] = useState(false);

  // Filter Options
  const [filters, setFilters] = useState({
    paid_at: "",
    payment_method: "",
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

  // Add state for payments
  const [payments, setpayments] = useState(mockPayments);

  // Filter & Search Algorithm
  const filteredpayments = payments.filter((payment) => {
    const matchesSearch = payment.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesDateFilter =
      !filters.paid_at ||
      new Date(payment.paid_at) == new Date(filters.paid_at);

    const matchesStatus =
      !filters.payment_method ||
      payment.payment_method === filters.payment_method;

    return matchesSearch && matchesDateFilter && matchesStatus;
  });

  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedpayments = filteredpayments.slice(startIndex, endIndex);

  const renderPaymentMethod = (payment_method) => {
    if (!payment_method) return null;

    let icon = faCreditCard;
    let label = payment_method;
    let color = "text-gray-700";
    let bg = "bg-gray-100";

    switch (payment_method.toLowerCase()) {
      case "paypal":
        icon = faCcPaypal;
        label = "PayPal";
        color = "text-blue-700";
        bg = "bg-blue-100";
        break;
      case "visa":
        icon = faCcVisa;
        label = "Visa";
        color = "text-indigo-700";
        bg = "bg-indigo-100";
        break;
      case "mastercard":
        icon = faCcMastercard;
        label = "MasterCard";
        color = "text-red-700";
        bg = "bg-red-100";
        break;
      case "apple pay":
        icon = faApplePay;
        label = "Apple Pay";
        color = "text-black";
        bg = "bg-gray-200";
        break;
      default:
        icon = faCreditCard;
        label = payment_method;
        color = "text-gray-700";
        bg = "bg-gray-100";
    }

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color} ${bg}`}
      >
        <FontAwesomeIcon icon={icon} />
        {label}
      </span>
    );
  };

  const renderPaymentStatus = (payment_status) => {
    if (!payment_status) return null;

    let icon = faHourglassHalf;
    let label = payment_status;
    let color = "text-gray-700";
    let bg = "bg-gray-100";

    switch (payment_status.toLowerCase()) {
      case "paid":
        icon = faCheckCircle;
        label = "Paid";
        color = "text-green-700";
        bg = "bg-green-100";
        break;
      case "pending":
        icon = faHourglassHalf;
        label = "Pending";
        color = "text-yellow-700";
        bg = "bg-yellow-100";
        break;
      case "failed":
        icon = faTimesCircle;
        label = "Failed";
        color = "text-red-700";
        bg = "bg-red-100";
        break;
      case "refunded":
        icon = faUndoAlt;
        label = "Refunded";
        color = "text-blue-700";
        bg = "bg-blue-100";
        break;
      default:
        icon = faHourglassHalf;
        color = "text-gray-700";
        bg = "bg-gray-100";
    }

    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${color} ${bg}`}
      >
        <FontAwesomeIcon icon={icon} />
        {label}
      </span>
    );
  };

  const renderPaymentDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Animations
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
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <motion.div
            className="payments flex flex-col w-full"
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
                All payments
              </h1>
              <div className="flex-row justify-between gap-2">
                <div className="flex flex-row justify-start gap-2 items-start">
                  <div className="relative w-full md:w-2/5 my-auto">
                    <input
                      type="text"
                      placeholder="Search for payments"
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
                      <DialogTitle>Filter payments</DialogTitle>
                      <DialogContent>
                        <Box
                          component="form"
                          sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}
                        >
                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                              Paid Date
                            </label>
                            <FormControl>
                              <OutlinedInput
                                type="date"
                                value={filters.startDate}
                                onChange={(e) =>
                                  handleFilterChange("paid_at", e.target.value)
                                }
                              />
                            </FormControl>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label className="text-sm font-medium text-gray-700">
                              Status
                            </label>
                            <FormControl>
                              <Select
                                native
                                value={filters.status}
                                onChange={(e) =>
                                  handleFilterChange(
                                    "payment_method",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="">All</option>
                                <option value="Visa">Visa</option>
                                <option value="PayPal">PayPal</option>
                                <option value="MasterCard">MasterCard</option>
                                <option value="Apple Pay">Apple Pay</option>
                              </Select>
                            </FormControl>
                          </div>
                        </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="table-responsive payments-table my-4 overflow-x-auto"
            >
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment ID
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm  font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Payment Method
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date Paid
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedpayments.length > 0 ? (
                    paginatedpayments.map((payment) => (
                      <tr
                        key={payment.id}
                        className="bg-white border-b hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-4 px-4 text-gray-900 font-medium">
                          {payment.id}
                        </td>
                        <td className="py-4 text-gray-900 font-mono text-sm">
                          {payment.user_name}
                        </td>
                        <td className="py-4 text-gray-600 ">
                          {payment.amount} {payment.currency}
                        </td>
                        <td className="py-4 text-gray-600 text-left">
                          {renderPaymentMethod(payment.payment_method)}
                        </td>
                        <td>{renderPaymentDate(payment.paid_at)}</td>
                        <td className="py-4 text-gray-600">
                          {renderPaymentStatus(payment.payment_status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No payments found
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
