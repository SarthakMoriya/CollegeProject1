import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";
import HeadingWrapper from "../../components/HeadingWrapper";
import p1 from "../../assets/trendingDest/bangalore.jpg";
import Footer from "../../components/Footer";
import CalendarIcon from "../../icons/CalendarIcon";
import RatingsIcon from "../../icons/RatingsIcon";
import GroupSize from "../../icons/GroupSize";
import PriceIcon from "../../icons/PriceIcon";
import Location from "../../icons/Location";
import { useNavigate } from "react-router-dom";
import TitleIcon from "../../icons/TitleIcon";

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
    navigate(
      `/edit/${tour._id}`
    );
  };
  useEffect(() => {
    fetchMyTours();
  }, []);
  return (
    <>
      <div className="border-b-4 border-blue-500">
        <br />
        <br />
        <br />
        <br />
        <HeadingWrapper heading={"YOUR TOURS"} />
        <div className="flex flex-wrap items-center justify-center gap-4 m-6">
          {tours.length &&
            tours.map((tour) => (
              <div
                key={tour?._id}
                className="border-2 rounded-lg shadow-sm mx-2 w-1/3 h-1/3"
              >
                <img src={tour?.imageUrl} alt="" className="rounded-lg " />
                <div className="flex items-center justify-center gap-4 text-white mt-4 mb-2">
                  <TitleIcon/>
                  <div className="capitalize">{tour?.title}</div>
                </div>
                <div className="flex items-center justify-center gap-4 text-white mt-4 mb-2">
                  <Location />
                  <div className="capitalize">{tour?.location}</div>
                </div>
                <div className="flex items-center justify-center gap-4 text-white my-2">
                  <PriceIcon />
                  <div className="capitalize">{tour?.price}</div>
                </div>
                <div className="flex items-center justify-center gap-4 text-white my-2">
                  <GroupSize />
                  <div className="capitalize">{tour?.maxGroupSize}</div>
                </div>
                <div className="flex items-center justify-center gap-4 text-white my-2">
                  <RatingsIcon />
                  <div className="capitalize">
                    <div className="">{tour?.ratingAverage}</div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-4 text-white my-2">
                  <CalendarIcon />
                  <div className="capitalize">
                    {tour?.startDate.slice(0, 10)}
                  </div>
                </div>
                <div className="flex items-center justify-center gap-8">
                  <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center my-2"
                    type="button"
                    onClick={() => {
                      editTour(tour);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    data-modal-target="crud-modal"
                    data-modal-toggle="crud-modal"
                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center my-2"
                    type="button"
                    onClick={() => {
                      deleteTour(tour);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTours;
