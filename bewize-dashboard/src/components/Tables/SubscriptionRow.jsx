import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function SubscriptionRow({ subscription }) {
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4 text-gray-900 font-medium">{subscription.id}</td>
      <td className="py-4 text-gray-600">
        {new Date(subscription.startDate).toLocaleDateString()}
      </td>
      <td className="py-4 text-gray-600">
        {new Date(subscription.endDate).toLocaleDateString()}
      </td>
      <td className="py-4 text-gray-900 font-mono text-sm">
        {subscription.orderId}
      </td>

    </tr>
  );
}
