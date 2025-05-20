import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PageTitle({ title, icon }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      {icon && <FontAwesomeIcon icon={icon} className="text-xl text-gray-600" />}
      <h1 className="font-semibold text-2xl">{title}</h1>
    </div>
  );
}
