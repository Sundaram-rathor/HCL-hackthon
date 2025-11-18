import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },

    stepsCount: { type: Number, default: 0 },
    waterIntake: { type: Number, default: 0 },

    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
  },
  { timestamps: true }
);

// Hash password before saving
patientSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//  Compare password
patientSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
