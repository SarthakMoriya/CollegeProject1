import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import p1 from "../../assets/trendingDest/amritsar.jpeg";
import p5 from "../../assets/trendingDest/bangalore.jpg";
import p4 from "../../assets/trendingDest/chennai.jpg";
import p3 from "../../assets/trendingDest/delhi.jpg";
import p2 from "../../assets/trendingDest/mumbai.jpg";

const TrendingDest = () => {
  const navigate=useNavigate();
  const destinations = [
    { img: p1, title: "amritsar", id: 10 },
    { img: p2, title: "mumbai", id: 11 },
    { img: p3, title: "delhi", id: 12 },
    { img: p4, title: "chennai", id: 13 },
    { img: p5, title: "bangalore", id: 14 },
  ];
  function handleNavigation(c){
    navigate(
      `/tours?location=${c.toLowerCase()}`
    );
  }
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center gap-4 w-3/4">
        <motion.div 
        onClick={()=>{handleNavigation(destinations[0].title)}}
          whileInView={{ x: [-100, 0] }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="flex items-center justify-center w-1/2 h-1/3 rounded-md
          relative"
        >
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[0].title}
          </div>
          <img
            src={destinations[0].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </motion.div>
        <motion.div
        onClick={()=>{handleNavigation(destinations[1].title)}}
          whileInView={{ x: [100, 0] }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="flex items-center justify-center w-1/2 h-1/3 relative"
        >
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[1].title}
          </div>
          <img
            src={destinations[1].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </motion.div>
      </div>
      <br />

      <motion.div className=" flex items-center justify-center gap-4">
        <motion.div
        onClick={()=>{handleNavigation(destinations[2].title)}}
          whileInView={{ y: [100, 0, 50, 0, 25, 0, 12.5, 0, 6, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="flex items-center justify-center w-1/2 h-1/3 relative"
        >
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[2].title}
          </div>
          <img
            src={destinations[2].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </motion.div>
        <motion.div
        onClick={()=>{handleNavigation(destinations[3].title)}}
          whileInView={{ y: [100, 0, 50, 0, 25, 0, 12.5, 0, 6, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="flex items-center justify-center w-1/2 h-1/3 relative"
        >
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[3].title}
          </div>
          <img
            src={destinations[3].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </motion.div>
        <motion.div
        onClick={()=>{handleNavigation(destinations[4].title)}}
          whileInView={{ y: [100, 0, 50, 0, 25, 0, 12.5, 0, 6, 0] }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="flex items-center justify-center w-1/2 h-1/3 relative"
        >
          <div className="absolute top-3 left-5 text-2xl font-bold text-white capitalize">
            {destinations[4].title}
          </div>
          <img
            src={destinations[4].img}
            alt=""
            className="w-full h-64 rounded-md"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TrendingDest;
