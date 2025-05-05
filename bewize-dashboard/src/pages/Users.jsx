import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faEye } from "@fortawesome/free-solid-svg-icons";
import FilterByButton from "../components/FilterByButton";
import Pagination from "../components/Pagination";

// User data - would typically come from an API
const mockUsers = [
  {
    id: 1,
    name: "Neil Sims",
    email: "neil.sims@bewize.com",
    phone: "+212636202710",
    cne: "J130040565",
    gender: "Male",
    registrationDate: "16, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+212634567890",
    cne: "J130040566",
    gender: "Female",
    registrationDate: "15, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 3,
    name: "Mohammed Alami",
    email: "m.alami@domain.com",
    phone: "+212612345678",
    cne: "J130040567",
    gender: "Male",
    registrationDate: "14, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 4,
    name: "Fatima Zahra",
    email: "f.zahra@mail.com",
    phone: "+212698765432",
    cne: "J130040568",
    gender: "Female",
    registrationDate: "13, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 5,
    name: "Youssef Benani",
    email: "y.benani@company.org",
    phone: "+212622334455",
    cne: "J130040569",
    gender: "Male",
    registrationDate: "12, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 6,
    name: "Amina Toumi",
    email: "a.toumi@institute.edu",
    phone: "+212677889900",
    cne: "J130040570",
    gender: "Female",
    registrationDate: "11, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 7,
    name: "Karim El Mansouri",
    email: "k.mansouri@business.com",
    phone: "+212655443322",
    cne: "J130040571",
    gender: "Male",
    registrationDate: "10, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 8,
    name: "Leila Berrada",
    email: "l.berrada@organization.net",
    phone: "+212611223344",
    cne: "J130040572",
    gender: "Female",
    registrationDate: "9, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 9,
    name: "Hassan Qasmi",
    email: "h.qasmi@enterprise.ma",
    phone: "+212699887766",
    cne: "J130040573",
    gender: "Male",
    registrationDate: "8, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 10,
    name: "Zahra El Fassi",
    email: "z.elfassi@institution.org",
    phone: "+212633445566",
    cne: "J130040574",
    gender: "Female",
    registrationDate: "7, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 11,
    name: "Omar Khadiri",
    email: "o.khadiri@corporation.com",
    phone: "+212688776655",
    cne: "J130040575",
    gender: "Male",
    registrationDate: "6, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    id: 12,
    name: "Nadia Amrani",
    email: "n.amrani@association.ma",
    phone: "+212644556677",
    cne: "J130040576",
    gender: "Female",
    registrationDate: "5, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: 13,
    name: "Mehdi Belhaj",
    email: "m.belhaj@foundation.edu",
    phone: "+212677889911",
    cne: "J130040577",
    gender: "Male",
    registrationDate: "4, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    id: 14,
    name: "Sofia Cherkaoui",
    email: "s.cherkaoui@institute.org",
    phone: "+212611992233",
    cne: "J130040578",
    gender: "Female",
    registrationDate: "3, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    id: 15,
    name: "Adil Benjelloun",
    email: "a.benjelloun@company.ma",
    phone: "+212655667788",
    cne: "J130040579",
    gender: "Male",
    registrationDate: "2, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    id: 16,
    name: "Yasmin El Khatib",
    email: "y.elkhatib@business.net",
    phone: "+212622334411",
    cne: "J130040580",
    gender: "Female",
    registrationDate: "1, Jul, 2025",
    avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 17,
    name: "Rachid Naciri",
    email: "r.naciri@organization.com",
    phone: "+212699887722",
    cne: "J130040581",
    gender: "Male",
    registrationDate: "30, Jun, 2025",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    id: 18,
    name: "Houda Zaoui",
    email: "h.zaoui@enterprise.org",
    phone: "+212633445511",
    cne: "J130040582",
    gender: "Female",
    registrationDate: "29, Jun, 2025",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    id: 19,
    name: "Anas El Fahsi",
    email: "a.elfahsi@institution.ma",
    phone: "+212688776611",
    cne: "J130040583",
    gender: "Male",
    registrationDate: "28, Jun, 2025",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 20,
    name: "Salma Bennis",
    email: "s.bennis@corporation.edu",
    phone: "+212644556611",
    cne: "J130040584",
    gender: "Female",
    registrationDate: "27, Jun, 2025",
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

export default function Users() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalUsers = mockUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = mockUsers.slice(startIndex, endIndex);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const handleViewDetails = (user) => {
    setSelectedUser(user);
  };

  // Animation variants (same as original)
  const navbarVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const sidebarVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const UserRow = ({ user }) => (
    <tr className="bg-white border-b hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <img
            className="rounded-full w-10 h-10"
            src={user.avatar}
            alt={`${user.name}'s avatar`}
          />
          <div>
            <h2 className="font-semibold text-md">{user.name}</h2>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4">{user.phone}</td>
      <td className="py-4">{user.cne}</td>
      <td className="py-4">{user.gender}</td>
      <td className="py-4">{user.registrationDate}</td>
      <td className="py-4">
        <button
          onClick={() => handleViewDetails(user)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
          aria-label={`View details for ${user.name}`}
        >
          <FontAwesomeIcon icon={faEye} size="sm" />
          <span>View</span>
        </button>
      </td>
    </tr>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Top navbar */}
      <motion.div initial="hidden" animate="visible" variants={navbarVariants}>
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </motion.div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sidebarVariants}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </motion.div>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <div className="users flex flex-col w-full">
            <div className="header flex flex-col justify-start gap-4">
              <h1 className="font-semibold text-2xl">All Users</h1>
              <div className="relative w-full flex gap-2">
                <div className="relative w-full md:w-2/5">
                  <input
                    type="text"
                    placeholder="Search for users"
                    className="pl-10 p-2 w-full rounded-lg border border-gray-300 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size="sm"
                  />
                </div>
                <FilterByButton />
              </div>
            </div>

            <div className="users-table my-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      CNE
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Gender
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date d'inscription
                    </th>
                    <th
                      scope="col"
                      className="py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.length > 0 ? (
                    paginatedUsers.map((user) => (
                      <UserRow key={user.id} user={user} />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-4 text-left text-gray-500"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="6" className="px-4 py-4">
                      <div className="flex justify-center">
                        <Pagination
                          currentPage={currentPage}
                          totalPages={Math.ceil(
                            mockUsers.length / itemsPerPage
                          )}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
