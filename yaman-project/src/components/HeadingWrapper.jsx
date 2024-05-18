/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
const HeadingWrapper = ({ heading }) => {
  return (
    <motion.div
      whileInView={{ opacity: [0, 1] }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="flex items-center justify-center my-4"
    >
      <div className="border-b-4 border-blue-700 text-2xl m-4 text-black font-bold">
        {heading}
      </div>
    </motion.div>
  );
};

export default HeadingWrapper;
