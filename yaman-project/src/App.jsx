import { useSelector } from "react-redux";
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
import ErrorBoundary from "./ErrorBoundary";
import AdminLogin from "./pages/Admin/AdminLogin";
import Panel from "./pages/Admin/Panel";
const App = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="bg-slate-900">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/panel"
              element={user?.role != "admin" ? <Panel /> : <AdminLogin />}
            />
            {<Route path="/" element={user == null ? <Login /> : <Home />} />}
            <Route
              path="/about"
              element={user == null ? <Login /> : <AboutUs />}
            />
            <Route
              path="/create"
              element={user == null ? <Login /> : <CreateTour />}
            />
            <Route
              path="/bookings"
              element={user == null ? <Login /> : <Booking />}
            />
            <Route
              path="/tours"
              element={user == null ? <Login /> : <Tours />}
            />
            <Route
              path="/mytours"
              element={user == null ? <Login /> : <MyTours />}
            />
            <Route
              path="/mybookings"
              element={user == null ? <Login /> : <MyBookings />}
            />
            <Route
              path="/guidedetails/:id"
              element={user == null ? <Login /> : <Guide />}
            />
            <Route
              path="/pay"
              element={user == null ? <Login /> : <Razorpay />}
            />
            <Route
              path="/edit/:id"
              element={user == null ? <Login /> : <EditTour />}
            />
            <Route
              path="/tours/:id"
              element={user == null ? <Login /> : <Tour />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
