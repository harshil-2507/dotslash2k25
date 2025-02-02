import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema(
  {
    
    time: {
        type: Date,
        required: true,
        },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields automatically
  },
)

export const Appointment = mongoose.model("Appointment", appointmentSchema)

