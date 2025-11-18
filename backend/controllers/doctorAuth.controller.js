import jwt from "jsonwebtoken";
import Doctor from "../models/doctor.model.js";

export const doctorSignup = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName)
      return res.status(400).json({ message: "All fields are required" });

    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const newDoctor = await Doctor.create({ email, fullName, password });

    const token = jwt.sign(
      { userId: newDoctor._id, role: "doctor" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt_doctor", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });

    res.status(201).json({
      success: true,
      user: newDoctor,
      message: "Doctor account created successfully",
    });
  } catch (error) {
    console.error("Doctor signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const doctorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    const doctor = await Doctor.findOne({ email });
    if (!doctor)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await doctor.matchPassword(!password);
    if (!match)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: doctor._id, role: "doctor" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt_doctor", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    res.json({ success: true, user: doctor });
  } catch (error) {
    console.error("Doctor login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const doctorLogout = (req, res) => {
  try {
    res.clearCookie("jwt_doctor", {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Doctor logged out successfully",
    });
  } catch (error) {
    console.log("Doctor logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
