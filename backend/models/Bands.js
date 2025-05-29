import mongoose from "mongoose";

const bandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    genre: { type: String },
    bio: { type: String },
    priceIndoor: { type: Number, required: true },
    priceOutdoor: { type: Number, required: true },
    image: { type: String },
    videoUrl: { type: String },
  },
  { timestamps: true }
);

const Band = mongoose.model("Band", bandSchema);

export default Band;
