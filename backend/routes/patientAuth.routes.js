import express from "express";
import { 
  patientSignup, 
  patientLogin, 
  patientLogout 
} from "../controllers/patientAuth.controller.js";

import { 
  getPatientDoctors,
  getAvailableDoctors,
  updatePatientGoals
} from "../controllers/patientUtility.controller.js";

import { verifyPatient } from "../middleware/auth.js";

const router = express.Router();

// ---------------- AUTH ----------------
router.post("/signup", patientSignup);
router.post("/login", patientLogin);
router.post("/logout", patientLogout);

// ---------------- UTILITIES ----------------
// Get list of doctors assigned to this patient
router.get("/:patientId/doctors", verifyPatient, getPatientDoctors);

// Get list of available doctors (not assigned)
router.get("/:patientId/available-doctors", verifyPatient, getAvailableDoctors);

// Update patient health goals (steps, water)
router.put("/update-goals", verifyPatient, updatePatientGoals);

export default router;
