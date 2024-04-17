import hotelmodel from "../models/hotelModel.js";
import mongoose from 'mongoose';
export async function createHotel(req, res) {
    // Request is an object and body is a key present in Request Object for create hotel
    try {
        const hotel = req.body;
        const newHotel = await hotelmodel.create(hotel);
        console.log(newHotel);
        res.send("Hotel Created Successfully!")
    } catch (error) {
        res.send("Error")
    }
}

export async function getHotels(req, res) {

    const allHotels = await hotelmodel.find()
    console.log(allHotels)
    res.send(allHotels)
}


export async function getHotel(req, res) {
    const hotelid = req.params;
    console.log(hotelid);
    const hotel = await hotelmodel.findById(hotelid.id)
    console.log(hotel);
    res.send("hello")

}

export async function deleteHotel(req, res) {
    const hotelid = req.params
    const hotel = await hotelmodel.findByIdAndDelete(hotelid.id)
    console.log(hotel);
    res.send("Deleted!")

}

export async function updateHotel(req,res){
    try {
        const id=req.body.id;
        console.log(id);
        // FIND HOTEL BY ID
        const hotel=await hotelmodel.findById(id); //returns single hotel object if found
        if(!hotel) return res.status(500).send("CAN NOT FIND HOTEL BY PROVIDED ID")

        // IF HOTEL IS FOUND
        console.log(hotel);
        let updatedHotel=await hotelmodel.findByIdAndUpdate(id,req.body)
        console.log(updateHotel);
        res.send("Hotel updated")
    } catch (error) {
        res.status(500).send("Error Updating HOtel")
    }
}