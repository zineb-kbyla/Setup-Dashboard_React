import React, { useState } from "react";

export default function Navbar({ onToggleSidebar }) {
  // User Profile DropDown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full shadow px-4 py-3 flex justify-between items-center bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <button
        onClick={onToggleSidebar}
        data-sidebar-toggle
        className="sm:hidden text-gray-600 text-2xl"
      >
        ☰
      </button>

      <a href="https://bewize.ma" className="flex ms-2 md:me-24">
        <img
          src="https://cdn.prod.website-files.com/61241693df6a919162546d4e/612d214b1c0a550f86c31148_Frame%20223.png"
          className="h-8 me-2"
          alt="Bewize Logo"
        />
        <span className="self-center text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
          Bewize
        </span>
      </a>

      <div className="flex items-center">
        <div className="flex items-center ms-3 relative">
          <div className="flex flex-row items-center justify-start gap-4">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user photo"
              />
            </button>
          </div>

          {dropdownOpen && (
            <div
              className="absolute top-12 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
              id="dropdown-user"
            >
              <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-900 dark:text-white" role="none">
                  Admin
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                  admin@bewize.com
                </p>
              </div>
              <ul className="py-1" role="none">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    role="menuitem"
                  >
                    <p className="text-red-500 hover:text-gray-300">Sign out</p>
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
