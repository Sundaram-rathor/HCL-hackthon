import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

export const verifyPatient = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_patient;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const patient = await Patient.findById(decoded.userId);

    if (!patient) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = {
      id: patient._id,
      role: "patient",
    };

    next();

  } catch (error) {
    console.log("Patient Auth Error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};


export const verifyDoctor = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_doctor;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const doctor = await Doctor.findById(decoded.userId);

    if (!doctor) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = {
      id: doctor._id,
      role: "doctor",
    };

    next();

  } catch (error) {
    console.log("Doctor Auth Error:", error);
    res.status(401).json({ message: "Not authorized" });
  }
};
