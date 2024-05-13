import express from "express";

import {
  adminLogin,
  approveAccounts,
  deleteUnapprovedAccounts,
  getAllAccounts,
  getUnapprovedAccounts,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/admin/login", adminLogin);
router.get("/admin/approveaccounts/:id", approveAccounts);
router.get("/admin/getunapprovedaccounts", getUnapprovedAccounts);
router.get("/admin/deleteunapproveaccount/:id", deleteUnapprovedAccounts);
router.get("/admin/getallaccounts", getAllAccounts);

export default router;
