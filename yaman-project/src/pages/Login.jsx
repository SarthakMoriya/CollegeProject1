import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../utils";
import { setLogin } from "../state";
import Footer from "../components/Footer";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        let data = await res.json();
        console.log(data.user[0].role);
        if (res?.ok) {
          dispatch(setLogin({ ...data }));
          if (data.user[0].role == "user") navigate("/");
          else if (data.user[0].role == "planner") navigate("/mytours");
        } else {
          alert("LOGIN FAILED...");
        }

        setloading(false);
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  return (
    <>
      <div className="w-full flex items-center justify-center h-[70vh]">
        {loading && (
          <div className="absolute top-0 left-0 h-screen w-screen bg-black text-blue-800  opacity-50 flex items-center justify-center">
            <span className="text-blue-600 opacity-90 z-10">Loading</span>
          </div>
        )}
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-blue-400 border-2 "
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="/signup"
              >
                Create an account
              </Link>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2024 xyz Corp. All rights reserved.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
