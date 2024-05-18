/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HeadingWrapper from "../../components/HeadingWrapper";
import BookingCard from "../../components/BookingCard";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

const Tours = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tours, setTours] = useState([]);
  const [searchTours, setSearchTours] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [error, setError] = useState("");

  const [ratedTours, setRatedTours] = useState([]);
  const [priceTours, setPriceTours] = useState([]);
  const [formData, setFormData] = useState({
    location: "amritsar",
    price: 1000,
    groupsize: 2,
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate(
      `/tours?location=${formData.location}&groupsize=${formData.groupsize}&price=${formData.price}`
    );
    filterBookingFromURL();
  };
  const fetchTours = async () => {
    const res = await fetch(`${BASE_URL}/gettours`);
    const data = await res.json();
    // console.log(data);
    if (res.ok) {
      setTours(data);
      setRatedTours(data.filter((tour) => tour.ratingAverage > 3));
      setPriceTours(data.sort((a, b) => a.price - b.price));
      return data;
    } else {
      setError("NO TOURS AVAILABLE");
    }
  };
  const filterBookingFromURL = async () => {
    console.log("I was called");
    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams.size);
    let location = queryParams.get("location");
    let price = queryParams.get("price");
    let groupsize = queryParams.get("groupsize");
    let allTours = await fetchTours();
    if (queryParams.size > 0) {
      let filteredTours = await allTours.filter((tour) => {
        console.log(tour);
        if (
          tour.location.toLowerCase() == location &&
          tour.maxGroupSize >= groupsize &&
          tour.price >= price
        ) {
          return tour;
        }
      });
      console.log(filteredTours);
      setSearchTours(filteredTours);
      setIsSearch(true);
    } else {
      setIsSearch(false);
      console.log("Still called");
    }
  };
  useEffect(() => {
    fetchTours();
    filterBookingFromURL();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className=" mb-8">
        {/* SEARCH BAR */}
        <div className="">
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="flex w-screen items-center justify-center">
            <form
              className="w-3/4  flex items-center justify-center p-3 gap-4"
              onSubmit={handleSubmit}
            >
              <input
                type="text"
                name="location"
                placeholder="location"
                onChange={handleChange}
                value={formData.location}
                className="p-3 rounded-lg"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="price"
                onChange={handleChange}
                className="p-3 rounded-lg"
              />
              <input
                type="text"
                name="groupsize"
                value={formData.groupsize}
                placeholder="group size"
                onChange={handleChange}
                className="p-3 rounded-lg"
              />
              <button className="p-3 border bg-blue-500 border-slate-700 rounded-lg hover:rounded-none hover:bg-slate-500 hover:text-white ease-in duration-500 ">
                Search
              </button>
            </form>
          </div>
        </div>
        {/* SEARCHED TOURS */}
        {searchTours.length && (
          <>
            <HeadingWrapper heading={"Search Results"} />
            <br />
            <div className="flex items-center flex-wrap justify-center">
              {searchTours.map((tour) => (
                <BookingCard key={tour?._id} tour={tour} />
              ))}
            </div>
          </>
        )}
        {searchTours.length == 0 && isSearch && (
          <div className="flex items-center justify-center w-screen text-2xl font-bold text-blue-400 mt-10">
            {" "}
            No Tours Found...
          </div>
        )}
        {/* ALL TOURS */}
        <br />
        <br />
        <HeadingWrapper heading={"Discover Tours"} />
        <br />
        <div className="slider-container">
          <Slider {...settings}>
            {tours.slice(0, 10).map((tour) => (
              <BookingCard key={tour?._id} tour={tour} />
            ))}
          </Slider>
        </div>
        {/* RATED TOURS */}
        <br />
        <br />
        <br />
        <HeadingWrapper heading={"Highly Rated Tours"} />
        <br />
        <div className="slider-container">
          <Slider {...settings}>
            {ratedTours?.slice(0, 10)?.map((tour) => (
              <BookingCard key={tour?._id} tour={tour} />
            ))}
          </Slider>
        </div>

        {/* PRICE RATED TOURS */}
        <br />
        <br />
        <br />
        <HeadingWrapper heading={"Budget Tours"} />
        <br />
        <div className="slider-container">
          <Slider {...settings}>
            {priceTours?.slice(0, 10)?.map((tour) => (
              <BookingCard key={tour?._id} tour={tour} />
            ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tours;
