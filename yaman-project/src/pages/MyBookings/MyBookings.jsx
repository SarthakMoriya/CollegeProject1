import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import HeadingWrapper from "../../components/HeadingWrapper";
import BookingIcon from "../../icons/BookingIcon";
import UserIdIcon from "../../icons/UserIdIcon";
import TourIdIcon from "../../icons/TourIdIcon";
import GroupSize from "../../icons/GroupSize";
import StatusIcon from "../../icons/StatusIcon";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const [status, setStatus] = useState("");
  console.log(user);
  const fetchUserBooking = async () => {
    await fetch(`${BASE_URL}/plannerbookings/${user[0]._id}`).then(
      async (res) => {
        if (res.ok) {
          let data = await res.json();
          console.log(data);
          setBookings(data);
          setStatus(data[0].status);
        }
      }
    );
  };
  const handleStatus = async (booking, e) => {
    console.log(e.target.value, booking);
    setStatus(e.target.value);
    await fetch(`${BASE_URL}/bookings`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...booking,
        status: e.target.value,
        id: booking._id,
      }),
    });
  };
  useEffect(() => {
    fetchUserBooking();
  }, []);
  return (
    <>
      <div className="min-h-screen">
        <div className="">
          <br />
          <br />
          <br /> <br />
          <HeadingWrapper heading={" MY BOOKINGS ORDERS"} />
          {bookings.length &&
            bookings.map((booking) => {
              return (
                <div
                  className="border-2 flex gap-4 items-center justify-between my-2 bg-slate-400 text-white"
                  key={booking._id}
                >
                  <div className="flex flex-col items-start justify-end gap-2 mx-4 my-2">
                    <div className="font-bold flex items-center justify-center gap-2">
                      <BookingIcon />
                      <div className="">Booking ID : {booking?._id}</div>
                    </div>
                    <div className="font-bold flex items-center justify-center gap-2">
                      <UserIdIcon />
                      <div className="">User ID : {booking?.userId}</div>
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
                  <div className="flex items-center justify-center gap-2">
                    <StatusIcon />
                    <div className="">
                      <select
                        name=""
                        id=""
                        value={status}
                        className="text-black"
                        onChange={(e) => {
                          console.log(e.target.value);
                          handleStatus(booking, e);
                          // setStatus(e.target.value)
                        }}
                      >
                        <option value="pending" className="text-black">
                          Pending
                        </option>
                        <option value="approved" className="text-black">
                          Approved
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBookings;
