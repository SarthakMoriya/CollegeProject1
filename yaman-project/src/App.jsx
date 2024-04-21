import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs";
import Navbar from "./components/Navbar";
import CreateTour from "./pages/Create/CreateTour";
import Tours from "./pages/Tours/Tours";
import Booking from "./pages/Bookings/Booking";
import MyTours from "./pages/MyTours/MyTours";
import MyBookings from "./pages/MyBookings/MyBookings";
import Guide from "./pages/Guide/Guide";
import Razorpay from "./components/RazorPay";
import EditTour from "./pages/EditTour.jsx/EditTour";
import Tour from "./pages/Tour/Tour";

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
          <Route path="/guidedetails/:id" element={<Guide />} />
          <Route path="/pay" element={<Razorpay />} />
          <Route path="/edit/:id" element={<EditTour />} />
          <Route path="/tours/:id" element={<Tour />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
