import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

export const getPatientDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const patient = await Patient.findById(patientId).populate("doctors");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Return only doctor list
    return res.status(200).json({
      success: true,
      doctors: patient.doctors,
    });

  } catch (error) {
    console.log("Error fetching patient doctors:", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAvailableDoctors = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!patientId) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    // find patient with doctor list
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // List of doctor IDs the patient already has
    const assignedDoctorIds = patient.doctors;

    // 2: Fetch doctors NOT in this list
    const availableDoctors = await Doctor.find({
      _id: { $nin: assignedDoctorIds }
    });

    return res.status(200).json({
      success: true,
      availableDoctors
    });

  } catch (error) {
    console.log("Error fetching available doctors:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePatientGoals = async (req, res) => {
  try {
    const { stepsGoal, waterGoal } = req.body;

    // Check at least one goal was sent
    if (stepsGoal === undefined && waterGoal === undefined) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const patient = await Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Update only provided fields
    if (stepsGoal !== undefined) patient.stepsGoal = stepsGoal;
    if (waterGoal !== undefined) patient.waterGoal = waterGoal;

    await patient.save();

    return res.status(200).json({
      success: true,
      message: "Patient goals updated successfully",
      updatedGoals: {
        stepsGoal: patient.stepsGoal,
        waterGoal: patient.waterGoal,
      },
    });

  } catch (error) {
    console.error("Update Goals Error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

