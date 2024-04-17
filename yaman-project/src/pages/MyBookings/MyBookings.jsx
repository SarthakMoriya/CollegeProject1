import { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const fetchUserBooking = async () => {
    await fetch(`${BASE_URL}/plannerbookings/${user[0]._id}`).then(
      async (res) => {
        if (res.ok) {
          let data = await res.json();
          setBookings(data);
        }
      }
    );
  };
  const handleStatus=async(booking,e)=>{
    console.log(e.target.value,booking)
    await fetch(`${BASE_URL}/bookings`,{
      method:"PATCH",
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({...booking,status:e.target.value,id:booking._id})
    })
  }
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
          <div className="flex items-center justify-center my-4">
            <div className="border-b-4 text-lg text-slate-700 font-bold">
              {" "}
              MY BOOKINGS ORDERS
            </div>
          </div>
          {bookings.length &&
            bookings.map((booking) => {
              return (
                <div
                  className="border-2 flex gap-4 items-center justify-between my-2 bg-slate-400 text-white"
                  key={booking._id}
                >
                  <div className="flex flex-col items-start justify-end gap-2 mx-4 my-2">
                    <div className="font-bold">Booking ID : {booking?._id}</div>
                    <div className="font-bold">User ID : {booking?.userId}</div>
                    <div className="font-bold">Tour ID : {booking?.tourId}</div>
                  </div>
                  <div className="">Group Size: {booking?.groupSize}</div>
                  <div className="">
                    Status: <select name="" id="" value={booking?.status} className="text-black" onChange={(e)=>{handleStatus(booking,e)}}>
                      <option value="pending" className="text-black">Pending</option>
                      <option value="approved" className="text-black">Approved</option>
                    </select>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="absolute bottom-0 w-screen">
        <Footer />
      </div>
    </>
  );
};

export default MyBookings;
