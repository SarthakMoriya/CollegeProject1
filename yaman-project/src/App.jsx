import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import CreateTour from "./pages/CreateTour";
import Tours from "./pages/Tours/Tours";
import Booking from "./pages/Bookings/Booking";
import MyTours from "./pages/MyTours/MyTours";
import { useSelector } from "react-redux";
import MyBookings from "./pages/MyBookings/MyBookings";

const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {<Route path="/" element={<Home />} />}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/create" element={<CreateTour />} />
          <Route path="/bookings" element={<Booking />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/mytours" element={<MyTours />} />
          <Route path="/mybookings" element={<MyBookings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
