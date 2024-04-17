import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import { createHotel, deleteHotel, getHotel, getHotels, updateHotel } from "./controllers/hotelController.js";

import { deleteUserById, getAllUsers, getUserById, login, signup } from "./controllers/userController.js";
import { createTour, deleteTour, getTour, getTours, getToursOfPlanner, updateTour } from "./controllers/tourController.js";
import { createBooking, deleteBooking, getBooking, getBookings, getPlannersBookings, updateBooking } from "./controllers/bookingController.js";


const app = express();
app.use(express.json())
app.use(cors())


app.post('/createtour',createTour)
app.get('/gettours',getTours)
app.get('/mytours/:id',getToursOfPlanner)
app.get('/gettour/:id',getTour)
app.delete('/deletetour/:id',deleteTour)
app.post('/updatetour',updateTour)
// DATABASE CONNECTION
mongoose.connect("mongodb+srv://yamanrampal10:gyRIFuo6e0vWq1FW@cluster0.v4uzxlf.mongodb.net/?retryWrites=true&w=majority");

app.listen(8000, function () {
    console.log("Server Started At 8000");
    console.log("Database connected!");
})

app.post('/signup',signup)
app.post('/login',login)
app.get('/getusers',getAllUsers)
app.get('/getuserbyid/:id',getUserById)
app.delete('/deleteUser/:id',deleteUserById)

app.post('/booking',createBooking);
app.get('/booking',getBooking);
app.get('/bookings/:id',getBookings);
app.patch('/bookings',updateBooking);
app.delete('/bookings/:id',deleteBooking);
app.get('/plannerbookings/:id',getPlannersBookings);