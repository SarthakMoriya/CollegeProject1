import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import 'dotenv/config'

import { deleteUserById, getAllUsers, getUserById, login, signup } from "./controllers/userController.js";
import { createTour, deleteTour, getTour, getTours, getToursOfPlanner, updateTour,getPlannerDetails } from "./controllers/tourController.js";
import { createBooking, deleteBooking, getBooking, getBookings, getPlannersBookings, updateBooking } from "./controllers/bookingController.js";

import adminRouter from './routes/adminRoutes.js'

const app = express();
app.use(express.json())
app.use(cors())

app.use('/auth',adminRouter)

// DATABASE CONNECTION
mongoose.connect(process.env.MONGODB_URL)

app.listen(8000, function () {
    console.log("Server Started At 8000");
    console.log("Database connected!");
})

app.post('/createtour',createTour)
app.get('/gettours',getTours)
app.get('/mytours/:id',getToursOfPlanner)
app.get('/gettour/:id',getTour)
app.delete('/deletetour/:id',deleteTour)
app.post('/updatetour',updateTour)

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
app.get('/guidestours/:id',getPlannerDetails)

app.post("/orders", async (req, res) => {
    try {

        console.log(req.body)
        const instance = new Razorpay({
            key_id: "rzp_test_zlCqIoqxiB2Mim",
            key_secret: "67xonNl4NhDy37GJmRXehMmE",
        });

        const options = {
            amount: req.body.data.price*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post("/success", async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;
        console.log(req.body)
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        // if (digest !== razorpaySignature)
        //     return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
});