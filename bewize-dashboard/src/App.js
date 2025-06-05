import "./App.css";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import User from "./pages/User";
import Subscriptions from "./pages/Subscriptions";
import Discounts from "./pages/Discounts";
import DiscountDetails from "./pages/DiscountDetails";
import Payments from "./pages/Payments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user" element={<User />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/discounts/:id" element={<DiscountDetails />} />
          <Route path="/payments" element={<Payments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
