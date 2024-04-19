import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useParams } from "react-router-dom";
import p1 from "../../assets/todo/kerela.jpg";
import BookingCard from "../../components/BookingCard";
import { useDispatch } from "react-redux";
import { setBooking } from "../../state";
import BookingModal from "../../components/BookingModal";
import UserIcon from "../../icons/UserIcon";
import EmailIcon from "../../icons/EmailIcon";
import PhoneIcon from "../../icons/PhoneIcon";
import HeadingWrapper from "../../components/HeadingWrapper";

const Guide = () => {
  const params = useParams();
  const [tours, setTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [guide, setGuide] = useState(null);
  const dispatch = useDispatch();
  const fetchGuidesDetails = async () => {
    await fetch(`${BASE_URL}/guidestours/${params.id}`).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        let plannerTours = data.filter((tour) => {
          if (tour.guides[0] == params.id) return tour;
        });
        console.log(plannerTours);
        setTours(plannerTours);
        console.log(tours);
      }
    });
  };
  const fetchGuide = async () => {
    await fetch(`${BASE_URL}/getuserbyid/${params.id}`).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setGuide(data);
      }
    });
  };
  const handleBooking = (tour) => {
    setShowModal(true);
    dispatch(setBooking(tour));
  };
  useEffect(() => {
    fetchGuidesDetails();
    fetchGuide();
  }, []);
  return (
    <div className="border-b-4 border-blue-500">
      <br />
      <br />
      <br />
      <br />
      <div className="flex w-screen items-center justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10 m-4">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src="https://th.bing.com/th/id/OIP.YQGwtpOGecZajkbh2HMMGAHaHa?w=162&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              alt="Bonnie image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {guide?.email.split("@")[0]}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {guide?.email}
            </span>
            <div className="flex mt-4 md:mt-6">
              <a
                href={`tel:+91${guide?.phoneno}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Call
              </a>
              <a
                href={`mailto:${guide?.email}`}
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Mail
              </a>
            </div>
          </div>
        </div>
      </div>

      <HeadingWrapper heading={"Check Tours"}/>
      <div className="flex flex-wrap items-center justify-center gap-4 m-6">
        {tours.length &&
          tours.map((tour) => (
            <BookingCard
              key={tour._id}
              tour={tour}
              handleBooking={handleBooking}
            />
          ))}
      </div>
      {showModal && <BookingModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Guide;
