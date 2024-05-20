/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import { BASE_URL, formatDate } from "../../../utils";
import { useState } from "react";
import { useEffect } from "react";
import HeadingWrapper from "../../components/HeadingWrapper";

import TitleIcon from "../../icons/TitleIcon";
import CalendarIcon from "../../icons/CalendarIcon";
import Location from "../../icons/Location";
import GroupSize from "../../icons/GroupSize";
import PriceIcon from "../../icons/PriceIcon";
import RatingsIcon from "../../icons/RatingsIcon";
import { useDispatch } from "react-redux";
import { setBooking } from "../../state";
import BookingModal from "../../components/BookingModal";
import DescriptionIcon from "../../icons/DescriptionIcon";
import Footer from "../../components/Footer";
import TourGuideCard from "../../components/TourGuideCard";


const Tour = () => {
  const params = useParams();
  const [tour, setTour] = useState(null);
  const [guide, setGuide] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const fetchTour = async () => {
    await fetch(`${BASE_URL}/gettour/${params.id}`).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        setTour(data.tour);
        setGuide(data.guide);
        console.log(data.tour);
      }
    });
  };

  const handleBooking = () => {
    setShowModal(true);
    dispatch(setBooking(tour));
  };

  useEffect(() => {
    fetchTour();
  }, []);
  return (
    <>
      <br />
      <br />
      <br />
      <div className="flex gap-4  justify-center min-h-screen min-w-screen border border-white p-12">
        <div className="flex  flex-col w-1/2 min-h-1/2 rounded-lg shadow-xl border">
          <div className="w-1/2 self-center shadow-xl mt-4">
            <img src={tour?.imageUrl} alt="" className="rounded-lg shadow-lg" />
          </div>

          <div className="flex flex-col  rounded-lg  my-6 p-4 capitalize">
            <div className="w-full text-center text-3xl font-bold my-4 text-black">
              Guide Details
            </div>
            <TourGuideCard guide={guide} />
          </div>
        </div>
        <div className="w-1/2 min-h-1/4 border rounded-lg shadow-xl">
          <div className="flex items-center justify-start gap-4 text-black  ml-8 p-4">
            <TitleIcon />
            <div className="">{tour?.title}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-black ml-8 p-4">
            <Location />
            <div className="">{tour?.location}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-black ml-8 p-4">
            <GroupSize />
            <div className="">{tour?.maxGroupSize} Persons allowed</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-black ml-8 p-4">
            <CalendarIcon />
            <div className="flex gap-4">
              <div className="">{formatDate(tour?.startDate)}</div>
              <div className="">-</div>
              <div className="">{formatDate(tour?.endDate)}</div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 text-black ml-8 p-4">
            <PriceIcon />
            <div className="">₹{tour?.price} /person</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-black ml-8 p-4">
            <RatingsIcon />
            <div className="">{tour?.ratingAverage} Ratings</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-black ml-8 p-4">
            <DescriptionIcon />
            <div className="">{tour?.desc}</div>
          </div>
          <div className="flex items-center justify-start gap-4">
            <button
              onClick={handleBooking}
              className="ml-8 p-2 border rounded-8 border-black text-black text-lg font-semibold rounded-lg hover:bg-blue-500 ease-out duration-500"
            >
              Book Tour
            </button>
          </div>
        </div>
      </div>
      <div className="w-screen mb-4 flex flex-col gap-4 flex-wrap justify-center min-h-screen  items-center">
        <HeadingWrapper heading={"Destinations Covered"} />
        <div className=" flex gap-4 flex-wrap justify-center">
          {tour?.destinations.map((dest, i) => (
            <div
              key={i}
              className="text-black max-w-[401px] w-[401px] shadow-lg border h-[500px]"
            >
              <img
                src={
                  dest.destimg == ""
                    ? "https://firebasestorage.googleapis.com/v0/b/yamanproject-4e8ba.appspot.com/o/1715253469516goa.jpg?alt=media&token=791f22aa-e186-4823-9ff8-4bf4df94f511"
                    : dest.destimg
                }
                alt=""
                className="max-w-[400px] max-h-[300px] h-full"
              />
              <div className="p-3 capitalize text-lg font-semibold ">
                {i + 1}){dest.descttitle}
              </div>
              <div className="p-3 capitalize text-lg font-semibold ">
                Date: {formatDate(dest.desctdate)}
              </div>
              <div className="
              truncate
              p-3 capitalize text-lg font-semibold  h-full">
                {dest.desctdesc}
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      {showModal && <BookingModal setShowModal={setShowModal} tour={tour} />}
      <Footer />
    </>
  );
};

export default Tour;
