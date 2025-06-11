import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faCalendarAlt,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

// School logo mapping
const schoolLogos = {
  "Groupe Scolaire L'initiale": "/images/schools/initiale.png",
  "Groupe Scolaire Lavoisier": "/images/schools/lavoisier.png",
  "Groupe Scolaire Tangerine": "/images/schools/tangerine.png",
  "Groupe Scolaire Al Jabr": "/images/schools/aljabr.png",
  "Bewize": "/images/schools/bewize.png"
};

const DiscountInformation = ({ discount, statistics }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Discount Information</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Row 1 */}
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Discount ID</p>
          <p className="text-sm font-medium text-gray-900">{discount.id}</p>
        </div>
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Code</p>
          <p className="text-sm font-medium text-gray-900">{discount.code}</p>
        </div>
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Percentage</p>
          <p className="text-sm font-medium text-gray-900">{discount.percentage}%</p>
        </div>

        {/* Row 2 */}
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Status</p>
          <p className="text-sm font-medium text-gray-900">
            <span
              className={`inline-flex items-center gap-2 ${
                discount.status === "Active"
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              <FontAwesomeIcon
                icon={discount.status === "Active" ? faCircleCheck : faCircleXmark}
              />
              {discount.status}
            </span>
          </p>
        </div>
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">School</p>
          <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <img 
              src={schoolLogos[discount.schoolName]} 
              alt={`${discount.schoolName} logo`}
              className="w-6 h-6 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/schools/default.png";
              }}
            />
            {discount.schoolName}
          </p>
        </div>
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Usage Count</p>
          <p className="text-sm font-medium text-gray-900">{statistics?.usageCount || 0}</p>
        </div>

        {/* Row 3 */}
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Start Date</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(discount.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">End Date</p>
          <p className="text-sm font-medium text-gray-900">
            {new Date(discount.endDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-50 px-3 py-2 rounded-lg">
          <p className="text-xs text-gray-500">Days Remaining</p>
          <p className="text-sm font-medium text-gray-900">
            {Math.ceil((new Date(discount.endDate) - new Date()) / (1000 * 60 * 60 * 24))} days
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountInformation; 