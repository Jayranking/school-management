const express = require("express");
const route = express.Router();
const studentCont = require("../controllers/studentCont");

route.get("/student-dashboard", studentCont.student_dashboard);

route.get("/student-memo", studentCont.student_memo);

route.get("/student-login", studentCont.student_login);
route.post("/student-login", studentCont.login);
route.get("/logout", studentCont.student_logout);

module.exports = route;
