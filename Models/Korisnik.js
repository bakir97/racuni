const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Korisnik = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    mjesto: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    direktor: {
      type: Boolean,
      default: false,
      required: true
    },
    adminAplikacije: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);
mongoose.model("korisnik", Korisnik);
