import usermodel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function signup(req, res) {
  try {
    const data = req.body;
    console.log(data);
    // CHECK IF EMAIL IS ALREADY IN USE?
    let existingUser = await usermodel.find({ email: data.email });
    if (!existingUser)
      return res.status(500).json({ message: "Email already in use" });
    const hashedPassword = await bcrypt.hash(data.password, 10);
    // CREATING USER
    let newUser = await usermodel.create({ ...data, password: hashedPassword });
    //Creating token
    const token = jwt.sign(data.email, "heheheheheheeh");
    res.status(200).json({ user: newUser, token });
  } catch (error) {
    // Unexpected Errors are caught here
    res.status(500).json({ message: "Error!", error });
  }
}
export async function getAllUsers(req, res) {
  const usermodel = await usermodel.find();
  console.log(usermodel);
  res.send(usermodel);
}
export async function getUserById(req, res) {
  const useriModelid = req.params;
  console.log(usermodelid);
  const usermodel = await usermodel.findById(useriModelid.id);
  console.log(usermodel);
  res.send("hello");
}
export async function deleteUserById(req, res) {
  const usermodelid = req.params;
  const usermodel = await usermodel.findByIdAndDelete(hotelid.id);
  console.log(hotel);
  res.send("Deleted!");
}
export async function login(req, res) {
  try {
    // Extracting Email and Password from req.body
    const credentails = req.body;

    // CHECK IF USER EXISTS ITH THE EMAI PROVIDED
    let existingUser = await usermodel.find({ email: credentails.email });
    if (!existingUser) return res.status(401).send("INVALID EMAIL");

    // IF THE USER EXISTIS WITH EMAIL PROVIDED MATCH THE PASSWORD
    let correctPassword = await bcrypt.compare(
      credentails.password,
      existingUser[0].password
    );
    if (!correctPassword) return res.status(401).send("Invalid PASSWORD");

    // IF PASSWORD IS ALSO CORRECT GENERATE TOKEN
    let token = jwt.sign(credentails.email, "heheheheheheeh");
    console.log(existingUser)
    res.status(200).json({ token, user: existingUser });
  } catch (error) {
    res.status(500).json({ message: "ERROR", error });
  }
}
