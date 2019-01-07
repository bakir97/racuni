const express = require("express");
const mongoose = require("mongoose");
const Unosi = mongoose.model("unosi");
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const noviUnos = await new Unosi(req.body);
    await noviUnos.save();
    res.json({ msg: "uspjesan unos", noviUnos });
  } catch (error) {
    res.status(400).json({ msg: "nije dobar unos" });
  }
});
router.get("/", async (req, res) => {
  const unosi = await Unosi.find({}).populate("capex");
  res.json(unosi);
});
router.post("/edit", async (req, res) => {
  const unosi = await Unosi.findByIdAndUpdate(req.body.id, req.body);
  await unosi.save();
  res.json(unosi);
});
module.exports = router;
