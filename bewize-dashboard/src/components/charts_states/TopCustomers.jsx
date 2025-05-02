import React , {use, useState} from "react";


export default function TopCustomers() {

  const topCustomersByPeriod = {
    today: [
      {
        id: 1,
        name: "Alice Morgan",
        email: "alice.morgan@bewize.com",
        amount: 540,
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        id: 2,
        name: "Lucas Wright",
        email: "lucas.wright@bewize.com",
        amount: 430,
        image: "https://randomuser.me/api/portraits/men/35.jpg",
      },
      {
        id: 3,
        name: "Chloe Bennett",
        email: "chloe.bennett@bewize.com",
        amount: 390,
        image: "https://randomuser.me/api/portraits/women/81.jpg",
      },
    ],
    yesterday: [
      {
        id: 4,
        name: "Ethan Scott",
        email: "ethan.scott@bewize.com",
        amount: 860,
        image: "https://randomuser.me/api/portraits/men/44.jpg",
      },
      {
        id: 5,
        name: "Sophie Turner",
        email: "sophie.turner@bewize.com",
        amount: 745,
        image: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      {
        id: 6,
        name: "Noah Walker",
        email: "noah.walker@bewize.com",
        amount: 720,
        image: "https://randomuser.me/api/portraits/men/52.jpg",
      },
    ],
    last7Days: [
      {
        id: 7,
        name: "Olivia Harris",
        email: "olivia.harris@bewize.com",
        amount: 4560,
        image: "https://randomuser.me/api/portraits/women/55.jpg",
      },
      {
        id: 8,
        name: "Liam Campbell",
        email: "liam.campbell@bewize.com",
        amount: 3890,
        image: "https://randomuser.me/api/portraits/men/63.jpg",
      },
      {
        id: 9,
        name: "Isabella Flores",
        email: "isabella.flores@bewize.com",
        amount: 4100,
        image: "https://randomuser.me/api/portraits/women/27.jpg",
      },
    ],
    last30Days: [
      {
        id: 10,
        name: "Mason Rivera",
        email: "mason.rivera@bewize.com",
        amount: 12000,
        image: "https://randomuser.me/api/portraits/men/26.jpg",
      },
      {
        id: 11,
        name: "Ava Peterson",
        email: "ava.peterson@bewize.com",
        amount: 11540,
        image: "https://randomuser.me/api/portraits/women/18.jpg",
      },
      {
        id: 12,
        name: "Elijah Brooks",
        email: "elijah.brooks@bewize.com",
        amount: 9870,
        image: "https://randomuser.me/api/portraits/men/17.jpg",
      },
    ],
    last90Days: [
      {
        id: 13,
        name: "Mia Reed",
        email: "mia.reed@bewize.com",
        amount: 45632,
        image: "https://randomuser.me/api/portraits/women/42.jpg",
      },
      {
        id: 14,
        name: "James Griffin",
        email: "james.griffin@bewize.com",
        amount: 32895,
        image: "https://randomuser.me/api/portraits/men/13.jpg",
      },
      {
        id: 15,
        name: "Emma Powell",
        email: "emma.powell@bewize.com",
        amount: 28763,
        image: "https://randomuser.me/api/portraits/women/38.jpg",
      },
    ],
  };
  
  


  const [selectedPeriod , setSelectedPeriod] = useState("last7Days");

  const handleChange = (e) => {
    setSelectedPeriod(e.target.value);
  }
  
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm dark:bg-white">
      <div className="flex justify-between items-center mb-4">
        <p className="text-lg font-semibold text-black">Top Customers</p>
        <select
        name="period"
        id="period"
        onChange={handleChange}
        value={selectedPeriod}
         className="px-4 py-2 text-sm outline-none">
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7Days">Last 7 Days</option>
            <option value="last30Days">Last 30 Days</option>
            <option value="last90Days">Last 90 Days</option>
        </select>
      </div>

      <table className="w-full table-fixed">
        <colgroup>
          <col className="w-[70%]" />
          <col className="w-[30%]" />
        </colgroup>
        <tbody>
          {topCustomersByPeriod[selectedPeriod].map((customer) => (
            <tr key={customer.id} className="border-t  hover:bg-gray-100">
              <td className="py-3 ps-2">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={customer.image}
                    alt={customer.name}
                  />
                  <div>
                    <h2 className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {customer.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="py-3 text-right">
                <p className="text-gray-900 font-bold pe-2">
                  ${customer.amount.toLocaleString()}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
