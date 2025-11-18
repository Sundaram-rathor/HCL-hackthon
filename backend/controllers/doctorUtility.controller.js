import Patient from "../models/patient.model.js";
import Doctor from "../models/doctor.model.js";

export const getMyPatients = async (req, res) => {
  try {
    const doctorId = req.user.id;

    if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID missing" });
    }

    // Find all patients where their doctors list contains the logged-in doctor ID
    const patients = await Patient.find({
      doctors: doctorId
    })
      .populate("doctors", "fullName email")   // populate doctors inside patient
      .select("-password");               

    return res.status(200).json({
      success: true,
      count: patients.length,
      patients
    });

  } catch (error) {
    console.error("Error fetching doctor's patients:", error.message);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};
