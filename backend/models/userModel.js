import mongoose, { Mongoose } from "mongoose";
const userschema = mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: String,
  phoneno: Number,
  username: String,
  role: {
    type: String,
    enum: ["user", "planner", "admin"],
    default: "user",
  },
  isAdmin: { default: false, type: Boolean },
  isAdminApproved: { default: false, type: Boolean },
});
const usermodel = mongoose.model("user", userschema);
export default usermodel;
