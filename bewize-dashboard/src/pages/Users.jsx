import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import UserRow from "../components/UserRow";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@mui/material";
import Box from "@mui/material/Box";

// Users Data
const mockUsers = [
  {
    id: 1,
    name: "Youssef El Amrani",
    first_name: "Youssef",
    last_name: "El Amrani",
    email: "youssef.elamrani@bewize.ma",
    phone: "+212612345678",
    cne: "J130040565",
    gender: "Male",
    registrationDate: "10, Sep, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-young-student-smiling_23-2148586534.jpg?ga=GA1.1.1153541554.1745938474&w=740",
    birthday: "2000-05-15",
    last_login: "2025-10-05T14:30:00Z",
    parent_id: 101,
    level_id: 3,
    school_id: 5,
    finished_courses_count: 12,
    level_school_id: 35,
    classroom_id: 7,
    location_country: "Morocco",
    location_city: "Casablanca",
    last_visit: "2025-10-03T09:15:00Z",
  },
  {
    id: 2,
    name: "Fatima Zahra Benali",
    first_name: "Fatima Zahra",
    last_name: "Benali",
    email: "fatima.benali@bewize.ma",
    phone: "+212698765432",
    cne: "J130040566",
    gender: "Female",
    registrationDate: "12, Sep, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-teenager-happy-be-back-university_23-2148586575.jpg?t=st=1746466528~exp=1746470128~hmac=b53e06093fc5dc5a51fd197d040d25b88be701f2846e21fc108bfe49aad0250c&w=900",
    birthday: "2001-07-22",
    last_login: "2025-10-04T11:20:00Z",
    parent_id: 102,
    level_id: 2,
    school_id: 3,
    finished_courses_count: 8,
    level_school_id: 23,
    classroom_id: 4,
    location_country: "Morocco",
    location_city: "Rabat",
    last_visit: "2025-10-02T10:45:00Z",
  },
  {
    id: 3,
    name: "Mehdi El Fassi",
    first_name: "Mehdi",
    last_name: "El Fassi",
    email: "mehdi.elfassi@bewize.ma",
    phone: "+212633445566",
    cne: "J130040567",
    gender: "Male",
    registrationDate: "15, Aug, 2025",
    avatar:
      "https://img.freepik.com/free-photo/side-view-smiley-man-carrying-books_23-2149659095.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740",
    birthday: "1999-11-30",
    last_login: "2025-10-06T08:15:00Z",
    parent_id: 103,
    level_id: 4,
    school_id: 2,
    finished_courses_count: 15,
    level_school_id: 42,
    classroom_id: 9,
    location_country: "Morocco",
    location_city: "Marrakech",
    last_visit: "2025-10-04T16:30:00Z",
  },
  {
    id: 4,
    name: "Amina Toumi",
    first_name: "Amina",
    last_name: "Toumi",
    email: "amina.toumi@bewize.ma",
    phone: "+212677889900",
    cne: "J130040568",
    gender: "Female",
    registrationDate: "20, Jul, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586553.jpg?ga=GA1.1.1153541554.1745938474&w=740",
    birthday: "2002-02-14",
    last_login: "2025-10-05T13:45:00Z",
    parent_id: 104,
    level_id: 1,
    school_id: 7,
    finished_courses_count: 5,
    level_school_id: 17,
    classroom_id: 2,
    location_country: "Morocco",
    location_city: "Tangier",
    last_visit: "2025-10-03T14:20:00Z",
  },
  {
    id: 5,
    name: "Karim El Mansouri",
    first_name: "Karim",
    last_name: "El Mansouri",
    email: "karim.mansouri@bewize.ma",
    phone: "+212655443322",
    cne: "J130040569",
    gender: "Male",
    registrationDate: "05, Sep, 2025",
    avatar:
      "https://img.freepik.com/premium-photo/student-with-backpack-book-back_1165863-38251.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740",
    birthday: "2000-09-05",
    last_login: "2025-10-07T10:10:00Z",
    parent_id: 105,
    level_id: 3,
    school_id: 4,
    finished_courses_count: 10,
    level_school_id: 34,
    classroom_id: 5,
    location_country: "Morocco",
    location_city: "Fes",
    last_visit: "2025-10-05T11:45:00Z",
  },
  {
    id: 6,
    name: "Leila Berrada",
    first_name: "Leila",
    last_name: "Berrada",
    email: "leila.berrada@bewize.ma",
    phone: "+212611223344",
    cne: "J130040570",
    gender: "Female",
    registrationDate: "18, Aug, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-school-girl-with-books-park_23-2148199228.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740",
    birthday: "2001-04-18",
    last_login: "2025-10-06T09:30:00Z",
    parent_id: 106,
    level_id: 2,
    school_id: 1,
    finished_courses_count: 7,
    level_school_id: 21,
    classroom_id: 3,
    location_country: "Morocco",
    location_city: "Agadir",
    last_visit: "2025-10-04T15:10:00Z",
  },
  {
    id: 7,
    name: "Omar Khadiri",
    first_name: "Omar",
    last_name: "Khadiri",
    email: "omar.khadiri@bewize.ma",
    phone: "+212688776655",
    cne: "J130040571",
    gender: "Male",
    registrationDate: "22, Jul, 2025",
    avatar:
      "https://img.freepik.com/premium-photo/student-with-backpack-book_1165863-38162.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740",
    birthday: "1999-12-25",
    last_login: "2025-10-07T14:20:00Z",
    parent_id: 107,
    level_id: 4,
    school_id: 6,
    finished_courses_count: 14,
    level_school_id: 46,
    classroom_id: 8,
    location_country: "Morocco",
    location_city: "Meknes",
    last_visit: "2025-10-05T17:30:00Z",
  },
  {
    id: 8,
    name: "Nadia Amrani",
    first_name: "Nadia",
    last_name: "Amrani",
    email: "nadia.amrani@bewize.ma",
    phone: "+212644556677",
    cne: "J130040572",
    gender: "Female",
    registrationDate: "30, Aug, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-young-student-smiling_23-2148586534.jpg?ga=GA1.1.1153541554.1745938474&w=740", // Repeats first image
    birthday: "2002-03-08",
    last_login: "2025-10-04T12:45:00Z",
    parent_id: 108,
    level_id: 1,
    school_id: 2,
    finished_courses_count: 4,
    level_school_id: 12,
    classroom_id: 1,
    location_country: "Morocco",
    location_city: "Oujda",
    last_visit: "2025-10-02T10:15:00Z",
  },
  {
    id: 9,
    name: "Hassan Qasmi",
    first_name: "Hassan",
    last_name: "Qasmi",
    email: "hassan.qasmi@bewize.ma",
    phone: "+212699887766",
    cne: "J130040573",
    gender: "Male",
    registrationDate: "14, Sep, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-teenager-happy-be-back-university_23-2148586575.jpg?t=st=1746466528~exp=1746470128~hmac=b53e06093fc5dc5a51fd197d040d25b88be701f2846e21fc108bfe49aad0250c&w=900", // Repeats second image
    birthday: "2000-08-12",
    last_login: "2025-10-06T16:40:00Z",
    parent_id: 109,
    level_id: 3,
    school_id: 3,
    finished_courses_count: 11,
    level_school_id: 33,
    classroom_id: 6,
    location_country: "Morocco",
    location_city: "Kenitra",
    last_visit: "2025-10-04T18:20:00Z",
  },
  {
    id: 10,
    name: "Zahra El Khatib",
    first_name: "Zahra",
    last_name: "El Khatib",
    email: "zahra.elkhatib@bewize.ma",
    phone: "+212622334411",
    cne: "J130040574",
    gender: "Female",
    registrationDate: "25, Jul, 2025",
    avatar:
      "https://img.freepik.com/free-photo/side-view-smiley-man-carrying-books_23-2149659095.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats third image
    birthday: "2001-01-30",
    last_login: "2025-10-05T15:55:00Z",
    parent_id: 110,
    level_id: 2,
    school_id: 5,
    finished_courses_count: 9,
    level_school_id: 25,
    classroom_id: 4,
    location_country: "Morocco",
    location_city: "Tetouan",
    last_visit: "2025-10-03T13:40:00Z",
  },
  {
    id: 11,
    name: "Anas El Fahsi",
    first_name: "Anas",
    last_name: "El Fahsi",
    email: "anas.elfahsi@bewize.ma",
    phone: "+212677889911",
    cne: "J130040575",
    gender: "Male",
    registrationDate: "08, Aug, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586553.jpg?ga=GA1.1.1153541554.1745938474&w=740", // Repeats fourth image
    birthday: "1999-10-17",
    last_login: "2025-10-07T11:25:00Z",
    parent_id: 111,
    level_id: 4,
    school_id: 1,
    finished_courses_count: 16,
    level_school_id: 41,
    classroom_id: 7,
    location_country: "Morocco",
    location_city: "Safi",
    last_visit: "2025-10-05T14:15:00Z",
  },
  {
    id: 12,
    name: "Sofia Cherkaoui",
    first_name: "Sofia",
    last_name: "Cherkaoui",
    email: "sofia.cherkaoui@bewize.ma",
    phone: "+212611992233",
    cne: "J130040576",
    gender: "Female",
    registrationDate: "17, Sep, 2025",
    avatar:
      "https://img.freepik.com/premium-photo/student-with-backpack-book-back_1165863-38251.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats fifth image
    birthday: "2002-05-22",
    last_login: "2025-10-04T10:05:00Z",
    parent_id: 112,
    level_id: 1,
    school_id: 4,
    finished_courses_count: 3,
    level_school_id: 14,
    classroom_id: 2,
    location_country: "Morocco",
    location_city: "El Jadida",
    last_visit: "2025-10-02T09:30:00Z",
  },
  {
    id: 13,
    name: "Adil Benjelloun",
    first_name: "Adil",
    last_name: "Benjelloun",
    email: "adil.benjelloun@bewize.ma",
    phone: "+212655667788",
    cne: "J130040577",
    gender: "Male",
    registrationDate: "03, Oct, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-school-girl-with-books-park_23-2148199228.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats sixth image
    birthday: "2000-07-07",
    last_login: "2025-10-08T13:15:00Z",
    parent_id: 113,
    level_id: 3,
    school_id: 6,
    finished_courses_count: 13,
    level_school_id: 36,
    classroom_id: 5,
    location_country: "Morocco",
    location_city: "Nador",
    last_visit: "2025-10-06T16:45:00Z",
  },
  {
    id: 14,
    name: "Yasmin El Khatib",
    first_name: "Yasmin",
    last_name: "El Khatib",
    email: "yasmin.elkhatib@bewize.ma",
    phone: "+212622334411",
    cne: "J130040578",
    gender: "Female",
    registrationDate: "19, Aug, 2025",
    avatar:
      "https://img.freepik.com/premium-photo/student-with-backpack-book_1165863-38162.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats seventh image
    birthday: "2001-09-14",
    last_login: "2025-10-05T09:40:00Z",
    parent_id: 114,
    level_id: 2,
    school_id: 7,
    finished_courses_count: 6,
    level_school_id: 27,
    classroom_id: 3,
    location_country: "Morocco",
    location_city: "Larache",
    last_visit: "2025-10-03T11:20:00Z",
  },
  // Continuing the pattern (cycle through first 7 images)
  {
    id: 15,
    name: "Rachid Naciri",
    first_name: "Rachid",
    last_name: "Naciri",
    email: "rachid.naciri@bewize.ma",
    phone: "+212699887722",
    cne: "J130040579",
    gender: "Male",
    registrationDate: "11, Jul, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-young-student-smiling_23-2148586534.jpg?ga=GA1.1.1153541554.1745938474&w=740", // Repeats first image again
    birthday: "1999-04-01",
    last_login: "2025-10-07T17:30:00Z",
    parent_id: 115,
    level_id: 4,
    school_id: 3,
    finished_courses_count: 17,
    level_school_id: 43,
    classroom_id: 9,
    location_country: "Morocco",
    location_city: "Khouribga",
    last_visit: "2025-10-05T19:10:00Z",
  },
  {
    id: 16,
    name: "Houda Zaoui",
    first_name: "Houda",
    last_name: "Zaoui",
    email: "houda.zaoui@bewize.ma",
    phone: "+212633445511",
    cne: "J130040580",
    gender: "Female",
    registrationDate: "28, Sep, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-teenager-happy-be-back-university_23-2148586575.jpg?t=st=1746466528~exp=1746470128~hmac=b53e06093fc5dc5a51fd197d040d25b88be701f2846e21fc108bfe49aad0250c&w=900", // Repeats second image again
    birthday: "2002-06-09",
    last_login: "2025-10-04T08:20:00Z",
    parent_id: 116,
    level_id: 1,
    school_id: 5,
    finished_courses_count: 2,
    level_school_id: 15,
    classroom_id: 1,
    location_country: "Morocco",
    location_city: "Beni Mellal",
    last_visit: "2025-10-02T08:45:00Z",
  },
  {
    id: 17,
    name: "Mehdi Belhaj",
    first_name: "Mehdi",
    last_name: "Belhaj",
    email: "mehdi.belhaj@bewize.ma",
    phone: "+212677889933",
    cne: "J130040581",
    gender: "Male",
    registrationDate: "07, Oct, 2025",
    avatar:
      "https://img.freepik.com/free-photo/side-view-smiley-man-carrying-books_23-2149659095.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats third image again
    birthday: "2000-03-12",
    last_login: "2025-10-08T15:45:00Z",
    parent_id: 117,
    level_id: 3,
    school_id: 2,
    finished_courses_count: 10,
    level_school_id: 32,
    classroom_id: 4,
    location_country: "Morocco",
    location_city: "Taza",
    last_visit: "2025-10-06T17:30:00Z",
  },
  {
    id: 18,
    name: "Salma Bennis",
    first_name: "Salma",
    last_name: "Bennis",
    email: "salma.bennis@bewize.ma",
    phone: "+212644556611",
    cne: "J130040582",
    gender: "Female",
    registrationDate: "23, Aug, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-young-student-happy-be-back-university_23-2148586553.jpg?ga=GA1.1.1153541554.1745938474&w=740", // Repeats fourth image again
    birthday: "2001-08-28",
    last_login: "2025-10-05T12:10:00Z",
    parent_id: 118,
    level_id: 2,
    school_id: 6,
    finished_courses_count: 7,
    level_school_id: 26,
    classroom_id: 3,
    location_country: "Morocco",
    location_city: "Settat",
    last_visit: "2025-10-03T14:50:00Z",
  },
  {
    id: 19,
    name: "Khalid El Ouazzani",
    first_name: "Khalid",
    last_name: "El Ouazzani",
    email: "khalid.elouazzani@bewize.ma",
    phone: "+212688776633",
    cne: "J130040583",
    gender: "Male",
    registrationDate: "01, Sep, 2025",
    avatar:
      "https://img.freepik.com/premium-photo/student-with-backpack-book-back_1165863-38251.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats fifth image again
    birthday: "1999-05-19",
    last_login: "2025-10-07T10:35:00Z",
    parent_id: 119,
    level_id: 4,
    school_id: 4,
    finished_courses_count: 18,
    level_school_id: 44,
    classroom_id: 8,
    location_country: "Morocco",
    location_city: "Guelmim",
    last_visit: "2025-10-05T12:25:00Z",
  },
  {
    id: 20,
    name: "Imane El Haddad",
    first_name: "Imane",
    last_name: "El Haddad",
    email: "imane.elhaddad@bewize.ma",
    phone: "+212611227744",
    cne: "J130040584",
    gender: "Female",
    registrationDate: "16, Oct, 2025",
    avatar:
      "https://img.freepik.com/free-photo/portrait-school-girl-with-books-park_23-2148199228.jpg?ga=GA1.1.1153541554.1745938474&semt=ais_hybrid&w=740", // Repeats sixth image again
    birthday: "2002-10-05",
    last_login: "2025-10-04T11:55:00Z",
    parent_id: 120,
    level_id: 1,
    school_id: 1,
    finished_courses_count: 1,
    level_school_id: 11,
    classroom_id: 1,
    location_country: "Morocco",
    location_city: "Dakhla",
    last_visit: "2025-10-02T10:30:00Z",
  },
];

export default function Users() {
  // Side Bar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Searching
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalUsers = mockUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter By State
  const [open, setOpen] = React.useState(false);

  // Filter Options
  const [filters, setFilters] = useState({
    gender: "",
  });

  // Handle Filter Change
  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  // Handle Open Filter Button
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Handle Close Filter Button
  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  // Filter & Search Algorithm
  const filteredUsers = mockUsers
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (user) =>
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.level || user.level_id.toString() === filters.level) &&
        (!filters.city || user.location_city === filters.city)
    );
  // Users that will be displayed on the page
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Animations
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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
          <motion.div
            className="users flex flex-col w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="header flex flex-col justify-start gap-4"
            >
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
                <div>
                  <Button onClick={handleClickOpen} className="">
                    Filter By
                  </Button>
                  <Dialog
                    disableEscapeKeyDown
                    open={open}
                    onClose={handleClose}
                  >
                    <DialogTitle>Fill the form</DialogTitle>
                    <DialogContent>
                      <Box
                        component="form"
                        sx={{ display: "flex", flexWrap: "wrap" }}
                      >
                        <FormControl sx={{ m: 1, minWidth: 160 }}>
                          <InputLabel htmlFor="demo-dialog-native">
                            Gender
                          </InputLabel>
                          <Select
                            native
                            value={filters.gender}
                            onChange={(e) =>
                              handleFilterChange("gender", e.target.value)
                            }
                            input={
                              <OutlinedInput
                                label="Gender"
                                id="demo-dialog-native"
                              />
                            }
                          >
                            <option aria-label="None" value="" />
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                          </Select>
                        </FormControl>
                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleClose}>Ok</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="users-table my-4 overflow-x-auto"
            >
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
                          totalPages={totalPages}
                          setCurrentPage={setCurrentPage}
                        />
                      </div>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
