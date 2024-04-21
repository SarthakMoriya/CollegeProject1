import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import BookingIcon from "../../icons/BookingIcon";
import UserIdIcon from "../../icons/UserIdIcon";
import TourIdIcon from "../../icons/TourIdIcon";
import GroupSize from "../../icons/GroupSize";
import StatusIcon from "../../icons/StatusIcon";
import { useNavigate } from "react-router-dom";
import HeadingWrapper from "../../components/HeadingWrapper";
const Booking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state?.auth?.user);
  console.log(user);
  const fetchBookings = async () => {
    await fetch(`${BASE_URL}/bookings/${user?._id}`).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        setBookings(data);
      } else {
        alert("Couldn't fetch bookings");
      }
    });
  };
  const handleDeleteBooking = async (tour) => {
    console.log(tour);
    await fetch(`${BASE_URL}/bookings/${tour._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      console.log(res.ok);
      let newBookings = bookings.filter(
        (booking) => booking?._id !== tour?._id
      );
      setBookings(newBookings);
    });
  };
  const handlePlanner = (id) => {
    navigate(`/guidedetails/${id}`);
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <>
      <div className="min-h-screen">
        <div className="">
          <br />
          <br />
          <br /> <br />
          <HeadingWrapper heading={"YOUR BOOKINGS"} />
          {bookings.length &&
            bookings.map((booking) => {
              return (
                <div
                  className="border-2 flex gap-4 items-center justify-between my-2 bg-slate-400 text-white"
                  key={booking?._id}
                >
                  <div className="flex flex-col items-start justify-end gap-2 mx-4 my-2">
                    <div className="font-bold flex items-center justify-center gap-2">
                      <BookingIcon />
                      <div className="">Booking ID : {booking?._id}</div>
                    </div>
                    <div className="font-bold flex items-center justify-center gap-2">
                      <UserIdIcon />
                      <div
                        className=""
                        onClick={() => handlePlanner(booking.plannerId)}
                      >
                        Planner ID : {booking?.plannerId}
                      </div>
                    </div>
                    <div className="font-bold flex items-center justify-center gap-2">
                      <TourIdIcon />
                      <div className="">Tour ID : {booking?.tourId}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <GroupSize />
                    <div className="">{booking?.groupSize}</div>
                  </div>
                  <div className="mx-4 flex items-center justify-center gap-2">
                    <StatusIcon />
                    <div className="">{booking?.status}</div>
                  </div>
                  {booking?.status != "approved" && (
                    <button
                      className="border rounded-lg p-3 mx-4 bg-blue-600"
                      onClick={() => {
                        handleDeleteBooking(booking);
                      }}
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Booking;
