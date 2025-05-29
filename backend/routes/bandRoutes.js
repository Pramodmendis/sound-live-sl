import express from "express";
import {
    createBand,
    deleteBand,
    getAllBands,
    updateBand,
} from "../controllers/bandController.js";

const router = express.Router();

router.post("/create", createBand);
router.get("/all", getAllBands);
router.put("/update/:id", updateBand);
router.delete("/delete/:id", deleteBand);

export default router;
