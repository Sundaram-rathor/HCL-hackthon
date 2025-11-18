import jwt from "jsonwebtoken";
import Patient from "../models/patient.model.js";

export const patientSignup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newPatient = await Patient.create({ email, fullName, password });

    const token = jwt.sign(
      { userId: newPatient._id, role: "patient" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt_patient", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      user: newPatient,
      message: "Patient account created successfully",
    });
  } catch (error) {
    console.error("Patient signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const patientLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const patient = await Patient.findOne({ email });
    if (!patient) return res.status(400).json({ message: "Invalid credentials" });

    const match = await patient.matchPassword(password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: patient._id, role: "patient" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt_patient", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.json({ success: true, user: patient });
  } catch (error) {
    console.error("Patient login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const patientLogout = (req, res) => {
  try {
    res.clearCookie("jwt_patient", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Patient logged out successfully",
    });
  } catch (error) {
    console.log("Patient logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

