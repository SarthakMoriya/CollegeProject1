import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";
import HeadingWrapper from "../../components/HeadingWrapper";
import Footer from "../../components/Footer";
import CalendarIcon from "../../icons/CalendarIcon";
import RatingsIcon from "../../icons/RatingsIcon";
import GroupSize from "../../icons/GroupSize";
import PriceIcon from "../../icons/PriceIcon";
import Location from "../../icons/Location";
import { useNavigate } from "react-router-dom";
import TitleIcon from "../../icons/TitleIcon";

import { motion } from "framer-motion";

const MyTours = () => {
  const [tours, setTours] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const fetchMyTours = async () => {
    await fetch(`${BASE_URL}/mytours/${user._id}`).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setTours(data);
      }
    });
  };
  const deleteTour = async (tour) => {
    await fetch(`${BASE_URL}/deletetour/${tour._id}`, {
      method: "DELETE",
    }).then(async (res) => {
      if (res.ok) {
        console.log("TOUR DELETED");
        let updatedTours = tours.filter((t) => t._id != tour._id);
        setTours(updatedTours);
      }
    });
  };
  const editTour = async (tour) => {
    navigate(`/edit/${tour._id}`);
  };
  useEffect(() => {
    fetchMyTours();
  }, []);
  return (
    <>
      <div className="border-b-4 border-blue-500 bg-slate-100">
        <br />
        <br />
        <br />
        <br />
        <HeadingWrapper heading={"YOUR TOURS"} />
        <div className="flex flex-wrap justify-center gap-8 m-6 ">
          {tours.length &&
            tours.map((tour) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                key={tour?._id}
                className="border-2 bg-slate-200 rounded-lg mx-2 max-w-[500px] w-[400px] shadow-xl"
              >
                <motion.div
                  whileInView={{ opacity: [0, 1] }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="max-w-[397px] max-h-[300px] h-[397px] overflow-hidden"
                >
                  <img
                    src={tour?.imageUrl}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                  />
                </motion.div>
                <div className=" flex flex-col">
                  <motion.div
                    whileInView={{ opacity: [0, 1]}}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-4 text-black mt-4 mb-2"
                  >
                    <TitleIcon />
                    <div className="capitalize">{tour?.title}</div>
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-4 text-black mt-4 mb-2"
                  >
                    <Location />
                    <div className="capitalize">{tour?.location}</div>
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-4 text-black my-2"
                  >
                    <PriceIcon />
                    <div className="capitalize">{tour?.price}</div>
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-4 text-black my-2"
                  >
                    <GroupSize />
                    <div className="capitalize">{tour?.maxGroupSize}</div>
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-4 text-black my-2"
                  >
                    <RatingsIcon />
                    <div className="capitalize">
                      <div className="">{tour?.ratingAverage}</div>
                    </div>
                  </motion.div>
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="flex items-center justify-center gap-4 text-black my-2"
                  >
                    <CalendarIcon />
                    <div className="capitalize">
                      {tour?.startDate.slice(0, 10)}
                    </div>
                  </motion.div>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <motion.button
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center my-2"
                    type="button"
                    onClick={() => {
                      editTour(tour);
                    }}
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center my-2"
                    type="button"
                    onClick={() => {
                      deleteTour(tour);
                    }}
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTours;
