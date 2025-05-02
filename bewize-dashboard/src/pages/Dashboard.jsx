import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import {
  faClipboardList,
  faShoppingCart,
  faTag,
  faU,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Animation variants
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


  return (
    <div className="flex flex-col h-screen">
      {/* Top navbar */}
      <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </motion.div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </motion.div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">

        </main>
      </div>
    </div>
  );
}
