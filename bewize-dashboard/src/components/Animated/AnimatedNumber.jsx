import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const AnimatedNumber = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    Math.floor(latest).toLocaleString()
  );

  useEffect(() => {
    const controls = animate(count, value, { duration: 1.5 });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

export default AnimatedNumber;
