import Tour from "../models/tourModel.js";
import mongoose from "mongoose";
import { data } from "../sampleData.js";

export async function createTour(req, res) {
  try {
    const tour = req.body;
    
    const newTour = await Tour.create(tour);
    res.status(200).json({ message: "Tour Created Successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getTours(req, res) {
  try {
    const allTours = await Tour.find();
    res.send(allTours);
  } catch (error) {
    res.status(500).send("Error fetching tours");
  }
}

export async function getToursOfPlanner(req, res) {
  try {
    const allTours = await Tour.find({ guides: req.params.id });
    res.send(allTours);
  } catch (error) {
    res.status(500).send("Error fetching tours");
  }
}

export async function getTour(req, res) {
  try {
    const tourId = req.params.id;
    console.log(tourId);
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).send("Tour not found");
    }
    res.send(tour);
  } catch (error) {
    res.status(500).send("Error fetching tour");
  }
}

export async function deleteTour(req, res) {
  try {
    const tourId = req.params.id;
    const tour = await Tour.findByIdAndDelete(tourId);
    if (!tour) {
      return res.status(404).send("Tour not found");
    }
    res.send("Tour deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting tour");
  }
}

export async function updateTour(req, res) {
  try {
    const tourId = req.body._id;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).send("Tour not found");
    }
    const updatedTour = await Tour.findByIdAndUpdate(tourId, req.body, {
      new: true,
    });
    console.log(updatedTour);
    res.send("Tour updated successfully");
  } catch (error) {
    res.status(500).send("Error updating tour");
  }
}

const saveSampleData = async () => {
  data.forEach(async (sample) => {
    await Tour.create({ ...sample });
  });
};

// saveSampleData()

export const getPlannerDetails = async (req, res) => {
  try {
    console.log(req.params.id);
    let tours = await Tour.find();
    console.log(tours[0].guides[0])
    let plannerTours = await tours.filter(
      (tour) => tour.guides[0] == req.params.id
    );
    console.log(plannerTours);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Failed to get planner details" });
  }
};
