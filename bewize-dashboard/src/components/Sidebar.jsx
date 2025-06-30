import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faHome,
  faUsers,
  faShoppingCart,
  faCreditCard,
  faDollarSign,
  faBox,
  faPercent,
  faChevronLeft,
  faChevronRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarItem from "./SidebarItem";

// Menu config (can be extracted to a separate file)
const menuItems = [
  { icon: faHome, label: "Dashboard", route: "/dashboard" },
  { icon: faUsers, label: "Users", route: "/users" },
  { icon: faShoppingCart, label: "Orders", route: "/orders" },
  { icon: faCreditCard, label: "Payments", route: "/payments" },
  { icon: faDollarSign, label: "Subscriptions", route: "/subscriptions" },
  { icon: faPercent, label: "Discounts", route: "/discounts" },
  { icon: faBox, label: "Complaints", route: "/complaints" },
];

export default function Sidebar({ isOpen }) {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <aside
      className={`fixed sm:sticky top-0 h-screen bg-white dark:bg-[#0f1c3e] text-gray-800 dark:text-white transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
        z-50
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <nav className="flex flex-col h-full" tabIndex={0}>
        {/* Top section: Logo + Collapse Button */}
        <div className="flex items-center justify-between px-6 pt-2 pb-2 border-b border-gray-200 dark:border-gray-700 relative">
          <div className="flex items-center">
            <img
              className="w-8 h-8"
              src="https://cdn.prod.website-files.com/61241693df6a919162546d4e/612d214b1c0a550f86c31148_Frame%20223.png"
              alt="Logo"
              loading="lazy"
            />
            <button
              onClick={toggleSidebar}
              className="p-2 ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <FontAwesomeIcon
                icon={collapsed ? faChevronRight : faChevronLeft}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() =>
              document.querySelector("[data-sidebar-toggle]")?.click()
            }
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors sm:hidden absolute top-4 right-4"
            aria-label="Close sidebar"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
        </div>
        {/* Sidebar Items (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.route}
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
                route={item.route}
                isActive={location.pathname === item.route}
                onClick={() => navigate(item.route)}
              />
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
