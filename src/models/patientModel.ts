import mongoose from "mongoose"

const patientSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    appointments: [
        {
          time: {
            type: Date,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
            default: Date.now,
          }
        }
      ],
  },
  {
    timestamps: true,
  },
)

const Patient = mongoose.models.Patient || mongoose.model("Patient", patientSchema)
 export default Patient

