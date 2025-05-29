import Comment from "../models/Comment.js";

// Get all comments for a page
export const getHomeComments = async (req, res) => {
  try {
    const comments = await Comment.find({ page: "home" }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Post a new comment
export const postHomeComment = async (req, res) => {
  const { username, message } = req.body;
  try {
    const newComment = new Comment({ username, message, page: "home" });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: "Failed to post comment" });
  }
};

// Edit a comment
export const updateHomeComment = async (req, res) => {
  const { id } = req.params;
  const { username, message } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.username !== username)
      return res.status(403).json({ message: "Unauthorized" });

    comment.message = message;
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: "Error updating comment" });
  }
};

// Delete a comment
export const deleteHomeComment = async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.username !== username)
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting comment" });
  }
};

// Add a reply to a comment
export const addReplyToComment = async (req, res) => {
  const { id } = req.params;
  const { username, message } = req.body;

  try {
    const comment = await Comment.findById(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    comment.replies.push({ username, message });
    await comment.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add reply" });
  }
};
