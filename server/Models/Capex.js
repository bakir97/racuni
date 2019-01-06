const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Capex = new Schema(
  {
    capexSifra: {
      type: String,
      required: true
    },
    odobreniBudzet: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);
mongoose.model("capex", Capex);
