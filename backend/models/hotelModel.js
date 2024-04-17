import mongoose from "mongoose";
const hotelschema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: Number,
    rating: Number,
    owner: String,
    phn: Number,
    state: String,
    city:String,
    discountPrice:Number,
    
});
const hotelmodel = mongoose.model("hotel", hotelschema);
export default hotelmodel




