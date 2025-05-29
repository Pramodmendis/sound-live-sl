import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
