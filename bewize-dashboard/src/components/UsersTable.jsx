import React from "react";
import UserRow from "./UserRow";

export default function UsersTable({ users }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
      <thead className="bg-gray-50">
        <tr>
          <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="py-3  text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Phone
          </th>
          <th className="py-3  text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            CNE
          </th>
          <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Gender
          </th>
          <th className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Date d'inscription
          </th>
          <th className="py-3  text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.length > 0 ? (
          users.map((user) => <UserRow key={user.id} user={user} />)
        ) : (
          <tr>
            <td colSpan="6" className="px-4 py-4 text-left text-gray-500">
              No users found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
