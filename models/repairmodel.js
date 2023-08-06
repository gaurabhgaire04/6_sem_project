import mongoose from "mongoose";

const repairSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Repair", repairSchema);
