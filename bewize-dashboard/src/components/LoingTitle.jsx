import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../constants/animations";

const LoginTitle = () => {
  return (
    <motion.div
      custom={2}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="text-center"
    >
      <h2 className="text-white text-2xl font-bold my-1">Sign In</h2>
      <p className="text-sm text-gray-400 my-2">
        Enter your email and password to access the admin dashboard.
      </p>
    </motion.div>
  );
};

export default LoginTitle; 