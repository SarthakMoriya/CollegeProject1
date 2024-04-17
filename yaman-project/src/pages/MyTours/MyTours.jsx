import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";
import p1 from "../../assets/trendingDest/bangalore.jpg";
import Footer from "../../components/Footer";

const MyTours = () => {
  console.log("ENETERED MY TOURS");
  const [tours, setTours] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const fetchMyTours = async () => {
    await fetch(`${BASE_URL}/mytours/${user[0]._id}`).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setTours(data);
      }
    });
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
        <div className="">
          <div className="">MY TOURS</div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 m-6">
          {tours.length &&
            tours.map((tour) => (
              <div
                key={tour._id}
                className="border-2 rounded-lg shadow-sm w-1/4"
              >
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
                >
                  Edit
                </button>
                <button
                  data-modal-target="crud-modal"
                  data-modal-toggle="crud-modal"
                  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyTours;
