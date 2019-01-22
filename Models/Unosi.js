const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Unosi = new Schema(
  {
    datumPocetkaSedmice: {
      type: Date,
      required: true
    },
    datumZavrsetkaSedmice: {
      type: Date,
      required: true
    },
    potrosnja: { type: Number, required: true },
    poslovnaJedinica: {
      type: String,
      required: true
    },
    capex: { type: Schema.Types.ObjectId, ref: "capex" },
    username: { type: String, required: true }
  },
  { timestamps: true }
);
mongoose.model("unosi", Unosi);
