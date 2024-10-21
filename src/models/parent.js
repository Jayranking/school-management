const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const parentSchema = mongoose.Schema({
  parentName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
    unique: true,
  },
  parentPhone_no: {
    type: String,
    required: true,
  },
  parentGender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  studentId: {
    type: mongoose.Schema.ObjectId,
    ref: "student",
  },
});

parentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login
parentSchema.statics.login = async function (parentEmail, password) {
  const user = await this.findOne({ parentEmail });
  if (user) {
    // compare password
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Incorrect Password");
  }
  throw new Error("Incorrect Credentials");
};
const Parent = mongoose.model("parent", parentSchema);
module.exports = Parent;
