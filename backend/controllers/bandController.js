import Band from "../models/Bands.js";

// Create a new band
export const createBand = async (req, res) => {
  try {
    const band = new Band(req.body);
    const savedBand = await band.save();
    res.status(201).json(savedBand);
  } catch (error) {
    console.error("❌ Failed to create band:", error);
    res.status(500).json({ message: "Failed to add band." });
  }
};

// Get all bands
export const getAllBands = async (req, res) => {
  try {
    const bands = await Band.find();
    res.status(200).json(bands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bands." });
  }
};

// Update a band
export const updateBand = async (req, res) => {
  try {
    const updated = await Band.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) {
      return res.status(404).json({ message: "Band not found" });
    }
    res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Failed to update band:", error);
    res.status(500).json({ message: "Failed to update band." });
  }
};

// Delete a band
export const deleteBand = async (req, res) => {
  try {
    const deleted = await Band.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Band not found" });
    }
    res.status(200).json({ message: "Band deleted successfully" });
  } catch (error) {
    console.error("❌ Failed to delete band:", error);
    res.status(500).json({ message: "Failed to delete band." });
  }
};


