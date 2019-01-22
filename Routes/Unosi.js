const express = require("express");
const mongoose = require("mongoose");
const Unosi = mongoose.model("unosi");
const router = express.Router();
router.get("/", async (req, res) => {
  const unosi = await Unosi.find({}).populate("capex");
  res.json(unosi);
});
router.post("/", async (req, res) => {
  const imaliUnosa = await Unosi.findById(req.body._id);
  if (imaliUnosa) {
    try {
      const unosi = await Unosi.findByIdAndUpdate(req.body._id, req.body);
      await unosi.save();
      return res.json(unosi);
    } catch (error) {
      return res.status(400).json({ msg: "error" });
    }
  }
  try {
    const noviUnos = await new Unosi(req.body);
    await noviUnos.save();
    res.json({ msg: "uspjesan unos", noviUnos });
  } catch (error) {
    console.log(error);

    res.status(400).json({ msg: "nije dobar unos" });
  }
});
module.exports = router;
