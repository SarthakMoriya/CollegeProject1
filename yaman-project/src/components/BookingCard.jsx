/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import CalendarIcon from "../icons/CalendarIcon";
import GroupSize from "../icons/GroupSize";
import Location from "../icons/Location";
import PriceIcon from "../icons/PriceIcon";
import RatingsIcon from "../icons/RatingsIcon";
import { formatDate } from "../../utils.js";
import { motion } from "framer-motion";

import "./BookingCard.css";

const BookingCard = ({ tour }) => {
  const navigate = useNavigate();
  return (
    <motion.div key={tour?._id} className="border-2 max-w-[400px] max-h-[550px] min-h-[550px] shadow-sm mx-2">
      <div className="max-w-[400px] max-h-[265px] min-h-[265px]">
        <img src={tour?.imageUrl} alt="" className="" />
      </div>
      <div className="">
        <div className="">
          <div className="flex items-center justify-center gap-4 text-white mt-4 mb-2">
            <Location />
            <div className="capitalize">{tour?.location}</div>
          </div>
          <div className="flex items-center justify-center gap-4 text-white my-2">
            <PriceIcon />
            <div className="capitalize">₹{tour?.price}</div>
          </div>
          <div className="flex items-center justify-center gap-4 text-white my-2">
            <GroupSize />
            <div className="capitalize">{tour?.maxGroupSize}</div>
          </div>
        </div>
        <div className="">
          <div className="flex items-center justify-center gap-4 text-white my-2">
            <RatingsIcon />
            <div className="capitalize">
              <div className="">{tour?.ratingAverage}</div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-white my-2">
            <CalendarIcon />
            <div className="capitalize">{formatDate(tour?.startDate)}</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            data-modal-target="crud-modal"
            data-modal-toggle="crud-modal"
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center my-2"
            type="button"
            onClick={() => {
              navigate(`/tours/${tour._id}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;
