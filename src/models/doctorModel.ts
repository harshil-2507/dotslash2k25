import mongoose from "mongoose"

const doctorSchema = new mongoose.Schema(
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
      ]
  },
  {
    timestamps: true,
  },
)

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema)
export default Doctor
