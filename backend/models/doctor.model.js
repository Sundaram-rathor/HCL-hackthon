import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const doctorSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },

    patients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  { timestamps: true }
);

// Hash password
doctorSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
