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
        <div className="flex  flex-col w-1/2 ">
          <div className="w-1/2  rounded-lg">
            <img src={tour?.imageUrl} alt="" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col border rounded-lg shadow-xl my-6 p-4 capitalize">
            <div className="w-full text-center text-3xl font-bold my-6 text-white">
              Guide Details
            </div>
            <div className="flex  text-white text-xl gap-4 ">
              <div className="">Name</div>
              <div className="">{guide?.email.split("@")[0]}</div>
            </div>
            <div className="flex  text-white text-xl gap-4 ">
              <div className="">Phone No.</div>
              <div className="">{guide?.phoneno}</div>
            </div>
            <div className="flex  text-white text-xl gap-4 ">
              <div className="">Email Address</div>
              <div className="">{guide?.email}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2 min-h-1/4 border rounded-lg shadow-xl">
          <div className="flex items-center justify-start gap-4 text-white  ml-8 p-4">
            <TitleIcon />
            <div className="">{tour?.title}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-white ml-8 p-4">
            <Location />
            <div className="">{tour?.location}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-white ml-8 p-4">
            <GroupSize />
            <div className="">{tour?.maxGroupSize}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-white ml-8 p-4">
            <CalendarIcon />
            <div className="flex gap-4">
              <div className="">{formatDate(tour?.startDate)}</div>
              <div className="">-</div>
              <div className="">{formatDate(tour?.endDate)}</div>
            </div>
          </div>
          <div className="flex items-center justify-start gap-4 text-white ml-8 p-4">
            <PriceIcon />
            <div className="">₹{tour?.price}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-white ml-8 p-4">
            <RatingsIcon />
            <div className="">{tour?.ratingAverage}</div>
          </div>
          <div className="flex items-center justify-start gap-4 text-white ml-8 p-4">
            <DescriptionIcon />
            <div className="">{tour?.desc}</div>
          </div>
          <button
            onClick={handleBooking}
            className="ml-8 p-3 rounded-8 border text-white border-white text-2xl font-bold rounded-lg hover:bg-blue-500 ease-out duration-500"
          >
            Book Tour
          </button>
        </div>
      </div>
      <HeadingWrapper heading={"Destinations Covered"}/>
      <div className="w-screen mb-4 flex gap-4 flex-wrap justify-center">
        {tour?.destinations.map((dest, i) => (
          <div key={i} className="text-white w-[400px] border">
            <img
              src={
                dest.destimg ==
                ""
                  ? "https://firebasestorage.googleapis.com/v0/b/yamanproject-4e8ba.appspot.com/o/1715253469516goa.jpg?alt=media&token=791f22aa-e186-4823-9ff8-4bf4df94f511"
                  : dest.destimg
              }
              alt=""
              className="max-w-[400px] max-h-[300px]"
            />
            <div className="p-3 capitalize text-lg font-semibold border">{i+1}){dest.descttitle}</div>
            <div className="p-3 capitalize text-lg font-semibold border max-h-[100px] h-full overflow-hidden text-ellipsis">{dest.desctdesc}</div>
            <div className="p-3 capitalize text-lg font-semibold border">{dest.desctdate}</div>
          </div>
        ))}
      </div>
      {showModal && <BookingModal setShowModal={setShowModal} tour={tour} />}
      <Footer />
    </>
  );
};

export default Tour;
