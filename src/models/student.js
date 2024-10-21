const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Student Schema
const studentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
    unique: true,
  },
  studentPhone_no: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  faculty: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  parentId: {
    type: mongoose.Schema.ObjectId,
    ref: "parent",
  },
});

studentSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login
studentSchema.statics.login = async function (studentEmail, password) {
  const user = await this.findOne({ studentEmail });
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
const Student = mongoose.model("student", studentSchema);
module.exports = Student;
