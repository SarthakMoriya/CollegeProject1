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
    if (req.body.role == "user") {
      let newUser = await usermodel.create({
        ...data,
        password: hashedPassword,
        isAdminApproved: true,
      });

      //Creating token
      const token = jwt.sign(data.email, "heheheheheheeh");
      return res.status(200).json({ user: newUser, token });
    } else {
      let newUser = await usermodel.create({
        ...data,
        password: hashedPassword,
      });

      //Creating token
      const token = jwt.sign(data.email, "heheheheheheeh");
      return res.status(200).json({ user: newUser, token });
    }
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
  const user = await usermodel.findById(req.params.id);
  res.send(user);
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
    console.log(existingUser);
    // IF THE USER EXISTIS WITH EMAIL PROVIDED MATCH THE PASSWORD
    let correctPassword = await bcrypt.compare(
      credentails.password,
      existingUser[0].password
    );
    if (!correctPassword) return res.status(401).send("Invalid PASSWORD");

    // IF PASSWORD IS ALSO CORRECT GENERATE TOKEN
    let token = jwt.sign(credentails.email, "heheheheheheeh");
    console.log(existingUser);
    res.status(200).json({ token, user: existingUser[0] });
  } catch (error) {
    res.status(500).json({ message: "ERROR", error });
  }
}

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "yaman@gmail.com" && password === "yaman") {
      const isAdmin = await usermodel.findOne({ email });
      if (!isAdmin) return res.status(404).send("Invalid Credentials");

      const token = jwt.sign({ id: isAdmin._id, email }, "topendseretpassword");

      return res
        .status(200)
        .json({ token, user: isAdmin, admin: true, secretkey: 1234 });
    } else {
      return res.status(500).json("Invalid Credentials");
    }
  } catch (error) {
    res.status(500).json({ error: "Invalid Credentials" });
  }
};

// ACCOUNTS TO BE APPROVED BY ADMIN

export const approveAccounts = async (req, res) => {
  try {
    const { id } = req.params;

    const account = await usermodel.findById(id);
    if (!account)
      return res.status(404).json({ error: "Invalid Teacher Account!" });
    account.isAdminApproved = true;
    await account.save();
    res.send({});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//  UNAPPROVED ACCOUNTS
export const getUnapprovedAccounts = async (req, res) => {
  try {
    const unapprovedAccounts = await usermodel.find({
      isAdminApproved: false,
    });

    res.send(unapprovedAccounts || []);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// REJECT A TEACHER ACCOUNT
export const deleteUnapprovedAccounts = async (req, res) => {
  try {
    await usermodel.findByIdAndDelete(req.params.id);
    res.send("Teacher Account deleted");
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllAccounts = async (req, res) => {
  let accounts1 = await usermodel.find({ role: "user" });
  let accounts2 = await usermodel.find({ role: "planner" });
  accounts1 = [...accounts1, ...accounts2];
  res.send(accounts1);
};
