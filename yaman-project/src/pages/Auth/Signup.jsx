import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL, toastify } from "../../../utils";
import { setLogin } from "../../state";
import Footer from "../../components/Footer";
import { ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
const Signup = () => {
  // const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == "" || email == "" || phone == " ") {
      toastify("Please enter all required fields", true);
    } else {
      setloading(true);
      await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        body: JSON.stringify({ email, password, phoneno: phone, role }),
        headers: { "Content-Type": "application/json" },
      })
        .then(async (res) => {
          let data = await res.json();
          if (res.ok) {
            toastify("Signup successful");
            setTimeout(() => {
              dispatch(setLogin({ ...data }));
              if(role=='user'){
                  navigate("/login")
              }else{
                navigate("/login");
              }
              setloading(false);
              setEmail("");
              setPassword("");
            }, 3000);
          } else {
            toastify("Email and phone number must be unique", true);
            setloading(false);
          }
        })
        .catch((err) => {
          toastify(`Signup failed -- ${err.message}`, true);
          setloading(false);
        });
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full flex items-center justify-center h-screen">
        {loading && (
          <div className="absolute top-0 left-0 h-screen w-screen bg-black text-blue-800  opacity-50 flex items-center justify-center">
            <span className="text-blue-600 opacity-90 z-10">Loading</span>
          </div>
        )}
        
        <motion.div
          whileInView={{ opacity: [0, 1] }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="w-full max-w-xs"
        >
          <div className="w-full flex items-center justify-center mt-8">
            <Link className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              TravelWithStar
            </Link>
          </div>
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-blue-400 border-2 "
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Email*
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="******************"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password*
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="******************"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Phone Number*
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                max={"9999999999"}
                min={"1000000000"}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder="+91 1234567890"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                name=""
                id="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="user">User</option>
                <option value="planner">Planner</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign up
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/login"
              >
                Have an account?
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 xyz Corp. All rights reserved.
          </p>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
