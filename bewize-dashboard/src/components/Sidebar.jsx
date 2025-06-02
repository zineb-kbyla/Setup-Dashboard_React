import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  faBars,
  faHome,
  faUsers,
  faShoppingCart,
  faCreditCard,
  faDollarSign,
  faBox,
  faPercent,
  faTimes,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarItem from "./SidebarItem";

const menuItems = [
  { icon: faHome, label: "Dashboard", route: "/dashboard" },
  { icon: faUsers, label: "Users", route: "/users" },
  { icon: faShoppingCart, label: "Orders", route: "/orders" },
  { icon: faCreditCard, label: "Payments", route: "/payments" },
  { icon: faDollarSign, label: "Subscriptions", route: "/subscriptions" },
  { icon: faPercent , label: "Discounts", route: "/discounts" },
];

export default function Sidebar({ isOpen }) {
  const [collapsed, setCollapsed] = useState(() => {
    // Get initial state from localStorage
    const saved = localStorage.getItem("sidebarCollapsed");
    return saved === "true";
  });

  useEffect(() => {
    // Save state to localStorage on change
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setCollapsed((prev) => !prev);

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`fixed sm:sticky top-0 h-screen bg-white dark:bg-[#0f1c3e] text-gray-800 dark:text-white transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
        z-30
      `}
    >
      <nav className="flex flex-col h-full">
        <div className="flex-1 p-4">
          <div className="flex flex-col gap-2">
            {menuItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                label={item.label}
                collapsed={collapsed}
                route={item.route}
                isActive={location.pathname === item.route}
                onClick={() => handleNavigation(item.route)}
              />
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <button
            onClick={toggleSidebar}
            className={`w-full flex items-center gap-3 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <FontAwesomeIcon 
              icon={collapsed ? faChevronRight : faChevronLeft} 
              className="text-gray-500 dark:text-gray-400"
            />
            {!collapsed && (
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Collapse Sidebar
              </span>
            )}
          </button>
        </div>

        <button
          onClick={() => document.querySelector('[data-sidebar-toggle]').click()}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors sm:hidden absolute top-4 right-4"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </nav>
    </div>
  );
}
