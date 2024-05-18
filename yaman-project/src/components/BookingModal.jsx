/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import p1 from "../assets/todo/goa.jpg";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils";
import { motion } from "framer-motion";

const BookingModal = ({ setShowModal, tour }) => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const booking = useSelector((state) => state.booking);
  console.log(booking.booking);
  const [formData, setFormData] = useState({
    phoneno: user?.phoneno,
    email: user?.email,
    price: booking?.booking?.price,
    name: user?.email?.split("@")[0],
    groupSize: 1,
    userId: user?._id,
    tourId: booking?.booking?._id,
    plannerId: booking?.booking?.guides[0],
  });
  const handleForm = (e) => {
    if (
      e.target.id == "groupSize" &&
      e.target.value > booking.booking.maxGroupSize
    ) {
      setFormData({
        ...formData,
        [e?.target?.id]: booking.booking.maxGroupSize,
      });
    } else {
      setFormData({ ...formData, [e?.target?.id]: e?.target?.value });
    }
  };
  const handleBooking = async (e) => {
    e.preventDefault();
    let totalPrice = formData.groupSize * formData.price;
    await fetch(`${BASE_URL}/booking`, {
      method: "POST",
      body: JSON.stringify({ ...formData, price: totalPrice }),
      headers: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        displayRazorpay(formData.price);
        setShowModal(false);
        localStorage.setItem(
          "booking",
          JSON.stringify({
            userdata: { ...formData },
            price: totalPrice,
            phone: data.planner.phoneno,
          })
        );
      }
    });
  };
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(price) {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const result = await axios.post("http://localhost:8000/orders", {
      headers: { "Content-Type": "application/json" },
      data: { price: formData.price * formData.groupSize },
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;
    console.log(amount);
    const options = {
      key: "rzp_test_zlCqIoqxiB2Mim", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: { p1 },
      order_id: order_id,
      handler: async function (response) {
        console.log(response);
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post("http://localhost:8000/success", data);

        alert(result.data.msg);
        if (result.data.msg) {
          localStorage.setItem("paymentSuccess", true);
          setTimeout(() => {
            let userData = JSON.parse(localStorage.getItem("booking"));
            let paymentSuccess = JSON.parse(
              localStorage.getItem("paymentSuccess")
            );
            console.log(paymentSuccess, userData);
            if (paymentSuccess) {
              window.location.href = `https://wa.me/${
                userData.phone
              }?text=Name:${userData.userdata.email.split("@")[0]}\n
                Email: ${
                userData.userdata.email
              }\n Mobile Number: ${userData.userdata.phoneno}\n
                Tour Id: ${userData.userdata.tourId}\n
                Total Price: ₹${userData.price}
              `;
            }
          }, 3000);
        }
      },
      prefill: {
        name: "Yaman Rampal ",
        email: "xyz@example.com",
        contact: "8544875229",
      },
      notes: {
        address: "XYZ CORP",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <motion.div className="flex">
      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 1, ease: "easeInOut" }}
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="flex  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                onClick={() => {
                  console.log("CLicked");
                  setShowModal(false);
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleBooking}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={user?.email?.split("@")[0]}
                    value={formData.name}
                    onChange={handleForm}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="name"
                    id="email"
                    defaultValue={user?.email}
                    value={formData.email}
                    onChange={handleForm}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="phno"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="phoneno"
                    defaultValue={user?.phoneno}
                    value={formData.phoneno}
                    onChange={handleForm}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required="true"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    disabled={true}
                    defaultValue={booking?.booking?.price}
                    value={formData.price}
                    className="cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="gs"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Group Size
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="groupSize"
                    max={booking.booking.maxGroupSize}
                    min={1}
                    value={formData?.groupSize}
                    onChange={handleForm}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="10"
                    required="true"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Book Tour
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BookingModal;
