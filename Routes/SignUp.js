const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
const bcrypt = require("bcryptjs");
router.post("/", async (req, res) => {
  console.log(req.body);

  const korisnikUsername = await Korisnik.findOne({
    username: req.body.username
  });
  const errors = {};
  if (korisnikUsername) {
    errors.username = "Username vec postoji";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }
  const podaci = {};
  podaci.username = req.body.username;
  podaci.mjesto = req.body.mjesto;
  if (req.body.direktor) {
    podaci.direktor = req.body.direktor;
  } else {
    podaci.direktor = false;
  }
  if (req.body.adminAplikacije) {
    podaci.adminAplikacije = req.body.adminAplikacije;
  } else {
    podaci.adminAplikacije = false;
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  podaci.password = hashPassword;
  const noviKorisnik = await new Korisnik(podaci);
  noviKorisnik.save();
  return res.status(200).json(noviKorisnik);
});

module.exports = router;
