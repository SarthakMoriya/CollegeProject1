import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import usermodel from "../models/userModel.js";

export async function createBooking(req, res) {
  try {
    const bookingData = req.body;
    console.log(req.body);
    const newBooking = await Booking.create(bookingData);
    console.log(newBooking);
    const planner=await usermodel.findById(req.body.plannerId);

    res.status(200).json({ message: "Booking Created Successfully!",planner });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getBookings(req, res) {
  try {
    console.log(req.params.id);
    const allBookings = await Booking.find({ userId: req.params.id });
    res.send(allBookings);
  } catch (error) {
    res.status(500).send("Error fetching bookings");
  }
}
export async function getPlannersBookings(req, res) {
  try {
    console.log(req.params.id);
    const allBookings = await Booking.find({ plannerId: req.params.id });
    res.send(allBookings);
  } catch (error) {
    res.status(500).send("Error fetching bookings");
  }
}

export async function getBooking(req, res) {
  try {
    const bookingId = req.params.id;
    console.log(bookingId);
    const booking = await Booking.findById(bookingId);
    console.log(booking);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send("Error fetching booking");
  }
}

export async function deleteBooking(req, res) {
  try {
    console.log("Deleted request");
    const bookingId = req.params.id;
    console.log(bookingId);
    const booking = await Booking.findByIdAndDelete(bookingId);
    console.log(booking);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    res.send("Booking deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting booking");
  }
}
export async function deleteALlBooking(req, res) {
  try {
    await Tour.deleteMany({}).then(() => {
      console.log("deleted");
    });
  } catch (error) {
    console.log("Error");
  }
}


export async function updateBooking(req, res) {
  try {
    const bookingId = req.body.id;
    console.log(bookingId);
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    console.log(booking);
    booking.status =req.body.status;
    await booking.save();
    console.log(booking)
    res.send("Booking updated successfully");
  } catch (error) {
    res.status(500).send("Error updating booking");
  }
}
