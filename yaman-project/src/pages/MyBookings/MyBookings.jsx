import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils";
import { useSelector } from "react-redux";

const MyBookings = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const fetchUserBooking = async () => {
    await fetch(`${BASE_URL}/plannerbookings/${user[0]._id}`);
  };
  useEffect(() => {
    fetchUserBooking();
  }, []);
  return <div>MyBookings</div>;
};

export default MyBookings;
