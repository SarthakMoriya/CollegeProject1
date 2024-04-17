import Tour from "../models/tourModel.js";
import mongoose from "mongoose";
import {data} from "../sampleData.js";

export async function createTour(req, res) {
  try {
    const tour = req.body;
    const newTour = await Tour.create(tour);
    console.log(newTour);
    res.status(200).json({ message: "Tour Created Successfully!" });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getTours(req, res) {
  try {
    const allTours = await Tour.find();
    console.log(allTours);
    res.send(allTours);
  } catch (error) {
    res.status(500).send("Error fetching tours");
  }
}

export async function getToursOfPlanner(req, res) {
  try {
    const allTours = await Tour.find({guides: req.params.id});
    console.log(allTours);
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
    console.log(tour);
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
    console.log(tour);
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
    const tourId = req.body.id;
    console.log(tourId);
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).send("Tour not found");
    }
    console.log(tour);
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
  data.forEach(async(sample)=>{
    await Tour.create({...sample})
    console.log("Tour created")
  })
};

// saveSampleData()