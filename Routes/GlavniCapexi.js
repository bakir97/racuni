const express = require("express");
const mongoose = require("mongoose");
const Capex = mongoose.model("Glavnicapex");
const router = express.Router();

router.post("/", async (req, res) => {
  const noviCapex = await new Capex(req.body);
  noviCapex.save();
  res.json({ msg: "uspjesno kreiran", noviCapex });
});
router.get("/", async (req, res) => {
  const Capexi = await Capex.find({});
  res.json(Capexi);
});
module.exports = router;
