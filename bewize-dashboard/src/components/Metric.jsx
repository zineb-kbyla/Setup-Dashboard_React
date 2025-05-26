import React from "react";
import AnimatedNumber from "./AnimatedNumber";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faArrowTrendDown,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import { metricVariants } from "../variants/dashboardVariants";

export default function Metric(probs) {
  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={metricVariants}>
        <div className="py-4 px-8 bg-gray-50 border w-auto shadow-sm rounded-xl flex flex-col gap-2">
          <div className="header flex flex-row justify-start items-center gap-2">
            <FontAwesomeIcon
              className="text-gray-500 my-auto"
              icon={probs.icon}
            />
            <p className="text-black font-semibold opacity-50 my-auto ">
              {probs.title}
            </p>
          </div>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="text-black font-bold text-2xl">
              <AnimatedNumber value={probs.data} />
            </p>
            <FontAwesomeIcon
              className={`text-2xl ${
                probs.percentage > 0 ? "text-green-600" : "text-red-600"
              }`}
              icon={probs.percentage > 0 ? faArrowTrendUp : faArrowTrendDown}
            />
            <p
              className={`font-bold ${
                probs.percentage > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {" "}
              {probs.percentage} %{" "}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
