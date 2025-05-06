import {
  faBox,
  faCreditCard,
  faDashboard,
  faDollarSign,
  faPercent,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";

export default function Sidebar({ isOpen }) {
  let navigate = useNavigate();

  return (
    <aside
      className={`fixed sm:relative top-0 left-0 z-40 w-64 h-full bg-white border-r dark:bg-gray-800 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } sm:translate-x-0`}
    >
      <nav className="p-4">
        <ul className="space-y-4 font-medium">
          <li>
            <a
              onClick={() => {
                navigate("/dashboard");
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faDashboard}
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="ms-3">Dashboard</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                navigate("/users");
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faUser}
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                navigate("/orders");
              }}
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faBox}
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Orders</span>
            </a>
          </li>
          <li>
            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">
                Subscriptions
              </span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faCreditCard}
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Payments</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <FontAwesomeIcon
                icon={faPercent}
                className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              />
              <span className="flex-1 ms-3 whitespace-nowrap">Discounts</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
