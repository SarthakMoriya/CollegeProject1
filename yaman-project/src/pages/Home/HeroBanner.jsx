import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <motion.div className="min-h-[65vh] bg-slate-500 border-2 rounded-lg">
      <motion.div
        className="mt-[220px] ml-[150px]"
        whileInView={{ x: [-200, 0], y: [-200, 0] }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="text-7xl font-bold  text-white">
          <motion.span 
          whileInView={{ fontSize:["20px","72px"] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-blue-500">Travel</motion.span> with star
        </div>
        <div className="text-5xl  mt-[20px] text-white">
          Search low price tours,vacations and much more...
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroBanner;
