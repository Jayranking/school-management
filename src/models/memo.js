const mongoose = require("mongoose");

const memoSchema = mongoose.Schema({
    memoTitle: {
    type: String,
    required: true,
  },
  memoRef: {
    type: String,
    required: true,
  },
  memoBody: {
    type: String,
    required: true,
  },

});

const Memo = mongoose.model("memo", memoSchema);
module.exports = Memo;
