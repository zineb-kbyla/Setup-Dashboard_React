import React from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../constants/animations";

const Logo = () => {
  return (
    <motion.div
      custom={1}
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center gap-2"
    >
      <img
        className="w-6 md:w-8"
        src="https://cdn.prod.website-files.com/61241693df6a919162546d4e/612d214b1c0a550f86c31148_Frame%20223.png"
        alt="Logo"
        loading="lazy"
      />
      <h1 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
        Bewize
      </h1>
    </motion.div>
  );
};

export default Logo; 