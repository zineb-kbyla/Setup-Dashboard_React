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
      className={`fixed  sm:relative top-0 h-screen bg-gray-800 text-white transition-all duration-300 flex flex-col
        ${collapsed ? "w-20" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        sm:translate-x-0
        z-30
      `}
    >
      <nav className="flex flex-col gap-2 p-4">
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
        <button
          onClick={toggleSidebar}
          className={`py-2 px-4 hover:bg-gray-700 rounded-lg transition-colors mt-4 ${
            collapsed ? "flex justify-center" : "text-left"
          }`}
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
        <button
          onClick={() => document.querySelector('[data-sidebar-toggle]').click()}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors sm:hidden"
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </nav>
    </div>
  );
}
