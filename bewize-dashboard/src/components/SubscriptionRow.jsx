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
      <td className="py-4 text-gray-900 font-mono text-sm">
        <div className="flex flex-row justify-center gap-2">
          <button className="border rounded-md shadow-sm hover:bg-blue-400 p-2 bg-blue-600 text-white font-semibold text-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
          <button className="border rounded-md shadow-sm hover:bg-red-400 p-2 bg-red-600 text-white font-semibold text-sm flex items-center gap-2">
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
