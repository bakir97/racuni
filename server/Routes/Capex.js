const express = require("express");
const mongoose = require("mongoose");
const Capex = mongoose.model("capex");
const router = express.Router();

router.post("/", async (req, res) => {
  const noviCapex = await new Capex(req.body);
  noviCapex.save();
  res.json({ msg: "uspjesno kreiran", noviCapex });
});

module.exports = router;
