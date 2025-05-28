import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import adminAnimation from "./animations/admin-dashboard.json";
import { rightPanelVariants } from "../constants/animations";

const RightPanel = () => {
  return (
    <motion.div
      key="right-panel"
      variants={rightPanelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full md:w-3/5 text-white flex items-center justify-center p-6 md:p-0"
    >
      <div className="max-w-md p-4 md:p-8 flex flex-col items-center text-center">
        <Lottie
          animationData={adminAnimation}
          loop={true}
          className="w-full max-w-md mb-3"
        />
        <p className="text-sm text-gray-400 mb-6">
          Manage, track, and support learning with confidence.
        </p>
      </div>
    </motion.div>
  );
};

export default RightPanel; 