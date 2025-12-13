import express from "express";

const router = express.Router();

router.get("/", (req,res) => {
    res.json({ message: "Hello horse"});
});

export default router;