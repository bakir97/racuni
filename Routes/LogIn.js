const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Korisnik = mongoose.model("korisnik");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
router.post("/", async (req, res) => {
  const korisnik = await Korisnik.findOne({ username: req.body.username });
  if (!korisnik) {
    return res.status(400).json({ username: "Username ne postoji" });
  }
  const bcrypt = require("bcryptjs");
  const korisnikPassword = await bcrypt.compare(
    req.body.password,
    korisnik.password
  );
  if (!korisnikPassword) {
    return res.status(400).json({ password: "Password nije tacan" });
  }
  const podaci = {};
  podaci.username = korisnik.username;
  podaci.mjesto = korisnik.mjesto;
  podaci.direktor = korisnik.direktor;
  podaci.adminAplikacije = korisnik.adminAplikacije;
  jwt.sign(podaci, keys.jwtKey, (err, token) => {
    return res.json({
      token: "Bearer " + token
    });
  });
});
module.exports = router;
