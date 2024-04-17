import mongoose, { Mongoose } from "mongoose";
const userschema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: String,
  phoneno: Number,
  username: String,
  role: {
    type: String,
    enum: ["user", "planner"],
    default: "user",
  },
});
const usermodel = mongoose.model("user", userschema);
export default usermodel;
