/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import p1 from "../../assets/trendingDest/amritsar.jpg";
import BookingModal from "../../components/BookingModal";
import { setBooking } from "../../state";
const Tours = () => {
  const dispatch = useDispatch();
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ratedTours, setRatedTours] = useState([]);
  const [priceTours, setPriceTours] = useState([]);
  const [formData, setFormData] = useState({
    location: "amritsar",
    checkin: "",
    groupsize: 2,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  const fetchTours = async () => {
    const res = await fetch(`${BASE_URL}/gettours`);
    const data = await res.json();
    if (res.ok) {
      setTours(data);
      setRatedTours(data.filter((tour) => tour.ratingAverage > 3));
      setPriceTours(data.sort((a, b) => a.price - b.price));
    } else {
      setError("NO TOURS AVAILABLE");
    }
  };
  const handleBooking = (tour) => {
    setShowModal(true);
    dispatch(setBooking(tour));
  };
  useEffect(() => {
    fetchTours();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div>
      {/* SEARCH BAR */}
      <div className="">
        <div>
          <form className="" onSubmit={handleSubmit}>
            <input
              type="text"
              name="location"
              placeholder="location"
              onChange={handleChange}
              value={formData.location}
            />
            <input
              type="date"
              name="checkin"
              value={formData.checkin}
              placeholder="checkin date"
              onChange={handleChange}
            />
            <input
              type="text"
              name="groupsize"
              value={formData.groupsize}
              placeholder="group size"
              onChange={handleChange}
            />
            <button>submit</button>
          </form>
        </div>
      </div>
      {/* ALL TOURS */}
      <div className="">
        <div className="">Discover Tours</div>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {tours.slice(0, 10).map((tour) => (
            <div key={tour._id} className="border-2 rounded-lg shadow-sm">
              <img src={p1} alt="" className="rounded-lg border-2" />
              <div className="">{tour.location}</div>
              <div className="">${tour.price}</div>
              <div className="">{tour.maxGroupSize}</div>
              <div className="">{tour.ratingAverage}</div>
              <div className="">{tour.startDate.slice(0, 10)}</div>
              <button
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                  handleBooking(tour);
                }}
              >
                Book Tour
              </button>
            </div>
          ))}
        </Slider>
      </div>
      {/* RATED TOURS */}
      <div className="">
        <div className="">Highly Rated Tours</div>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {ratedTours?.slice(0, 10)?.map((tour) => (
            <div key={tour._id} className="border-2 rounded-lg shadow-sm">
              <img src={p1} alt="" className="rounded-lg border-2" />
              <div className="">{tour.location}</div>
              <div className="">${tour.price}</div>
              <div className="">{tour.maxGroupSize}</div>
              <div className="">{tour.ratingAverage}</div>
              <div className="">{tour.startDate.slice(0, 10)}</div>
              <button
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                  handleBooking(tour);
                }}
              >
                Book Tour
              </button>
            </div>
          ))}
        </Slider>
      </div>

      {/* PRICE RATED TOURS */}
      <div className="">
        <div className="">PRICE Rated Tours</div>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {priceTours?.slice(0, 10)?.map((tour) => (
            <div key={tour._id} className="border-2 rounded-lg shadow-sm">
              <img src={p1} alt="" className="rounded-lg border-2" />
              <div className="">{tour.location}</div>
              <div className="">${tour.price}</div>
              <div className="">{tour.maxGroupSize}</div>
              <div className="">{tour.ratingAverage}</div>
              <div className="">{tour.startDate.slice(0, 10)}</div>
              <button
                data-modal-target="crud-modal"
                data-modal-toggle="crud-modal"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => {
                  handleBooking(tour);
                }}
              >
                Book Tour
              </button>
            </div>
          ))}
        </Slider>
      </div>
      {showModal && <BookingModal  setShowModal={setShowModal} />}
    </div>
  );
};

export default Tours;
