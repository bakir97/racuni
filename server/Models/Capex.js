const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Capex = new Schema(
  {
    capexSifra: {
      type: String,
      required: true
    },
    datumPocetkaCapexa: {
      type: String,
      required: true
    },
    datumZavrsetkaCapexa: {
      type: String,
      required: true
    },
    budzetSarajevo: {
      type: Number,
      required: true
    },
    budzetZenica: {
      type: Number,
      required: true
    },
    budzetTuzla: {
      type: Number,
      required: true
    },
    budzetMostar: {
      type: Number,
      required: true
    },
    budzetSBK: {
      type: Number,
      required: true
    },
    Sarajevo: {
      type: Boolean,
      required: true
    },
    Zenica: {
      type: Boolean,
      required: true
    },
    Mostar: {
      type: Boolean,
      required: true
    },
    Tuzla: {
      type: Boolean,
      required: true
    },
    SBK: {
      type: Boolean,
      required: true
    }
  },
  { timestamps: true }
);
mongoose.model("capex", Capex);
