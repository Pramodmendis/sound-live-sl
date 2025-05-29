import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  page: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [replySchema],
});

export default mongoose.model("Comment", commentSchema);
