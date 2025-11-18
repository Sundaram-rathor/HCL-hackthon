import express from "express";
import { 
  doctorSignup, 
  doctorLogin, 
  doctorLogout 
} from "../controllers/doctorAuth.controller.js";

import { 
  getMyPatients 
} from "../controllers/doctorUtility.controller.js";

import { verifyDoctor } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", doctorSignup);
router.post("/login", doctorLogin);
router.post("/logout", doctorLogout);

// ---------------- UTILITIES ----------------
// Get all patients assigned to a doctor
router.get("/my-patients", verifyDoctor, getMyPatients);

export default router;
