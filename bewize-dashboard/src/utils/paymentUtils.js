import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcPaypal,
  faCcVisa,
  faCcMastercard,
  faApplePay,
} from "@fortawesome/free-brands-svg-icons";
import { 
  faCreditCard,
  faCheckCircle,
  faHourglassHalf,
  faTimesCircle,
  faUndoAlt
} from "@fortawesome/free-solid-svg-icons";

export const renderPaymentMethod = (payment_method) => {
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

export const renderPaymentStatus = (payment_status) => {
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

export const renderPaymentDate = (date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}; 