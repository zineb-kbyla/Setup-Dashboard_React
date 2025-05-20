import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarItem({ icon, label, collapsed, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-4 p-3 rounded-lg transition-colors w-full
        ${isActive 
          ? 'bg-gray-700 text-white' 
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
      <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
        <FontAwesomeIcon icon={icon} size="lg" className="min-w-[20px]" />
        {!collapsed && <span className="font-medium ml-4">{label}</span>}
      </div>
    </button>
  );
}
