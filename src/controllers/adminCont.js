const Admin = require("../models/admin");
const Student = require("../models/student");
const Parent = require("../models/parent");
const Memo = require("../models/memo");
const jwt = require("jsonwebtoken");
const { sendEmail, generatePassword } = require("../helpers/util");


module.exports = {
  dashboard: (req, res) => {
    res.render("dashboard");
  },

  get_login: (req, res) => {
    res.render("login");
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const pwdReg = /^(?:[0-9A-Za-z!@#$%^&*()\-+=_{}\[\]|:;"'<>,.?\\/ ])+$/;

    try {
      if (!emailReg.test(email)) {
        throw new Error("Invalid email address");
      }

      if (!pwdReg.test(password)) {
        throw new Error("Incorrect password");
      }

      // invoke the static login method
      const isLoggedIn = await Admin.login(email, password);

      if (isLoggedIn) {
        // Generate JWT token
        const token = jwt.sign(
          { id: isLoggedIn._id },
          process.env.TOKEN_SECRET,
          { expiresIn: 1000 * 60 * 60 * 24 }
        );
        // console.log(token);

        // send JWT to cookie
        res.cookie("jwt", token, { maxAge: 4000 * 60 * 60 });

        return res.status(200).json({
          success: true,
          msg: "Login Successfully",
          redirectURL: "/dashboard",
          admin: isLoggedIn,
        });
      }
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },

  register_admin: async (req, res) => {
    const { fullname, email, phone_no } = req.body;

    const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneReg = /^0[1-9]\d{9}$/;

    try {
      if (!fullnameReg.test(fullname)) {
        throw new Error("Invalid name format");
      }

      if (!emailReg.test(email)) {
        throw new Error("Invalid email address");
      }

      if (!phoneReg.test(phone_no)) {
        throw new Error("Invalid phone number input");
      }

      // Create user and put in db
      const admin = await Admin.create({
        fullname,
        email,
        phone_no,
        password: "Password@2",
      });
      console.log(admin);

      return res.status(200).json({
        success: true,
        msg: "Account created successfully",
        redirectURL: "/sign-in",
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  admin_logout: (req, res) => {
    res.cookie("jwt", "", { maxAge: 4 });
    res.redirect("/sign-in");
  },

  get_register: (req, res) => {
    res.render("register");
  },

  registeration: async(req, res) => {
    const { studentName, regNo, studentPhone_no, studentEmail, gender, faculty, dept, level, parentName, parentEmail, parentPhone_no, parentGender } = req.body;
    console.log(req.body);
    
    const fullnameReg = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneReg = /^0[1-9]\d{9}$/;
    // const reg_noReg = /^\d{4}\/[a-zA-Z]{1,4}\/\d+$/;


    try {
      if (!fullnameReg.test(studentName)) {
        throw new Error("Invalid name format");
      }

      // if (!reg_noReg.test(regNo)) {
      //   throw new Error("Invalid registration number format");
      // }

      if (regNo == '') {
        throw new Error("Invalid registration number format");
        
      }

      // if (!emailReg.test(studentEmail)) {
      //   throw new Error("Invalid student email address");
      // }
      if (studentEmail == '') {
        throw new Error("Invalid student email address");
      }

      // if (!phoneReg.test(studentPhone_no)) {
      //   throw new Error("Invalid phone number input");
      // }
      if (studentPhone_no == '') {
        throw new Error("Invalid phone number input");
      }

      if (gender == '') {
        throw new Error("Please select a gender");
      }

      if (faculty == '') {
        throw new Error("Please select a faculty");
      }

      if (dept == '') {
        throw new Error("Please select a department");
      }

      if (level == '') {
        throw new Error("Please select a level");
      }

      if (!fullnameReg.test(parentName)) {
        throw new Error("Invalid name format");
      }

      // if (!emailReg.test(parentEmail)) {
      //   throw new Error("Invalid parent email address");
      // }
      if (parentEmail == '') {
        throw new Error("Invalid parent email address");
      }

      // if (!phoneReg.test(parentPhone_no)) {
      //   throw new Error("Invalid phone number input");
      // }

      if (parentPhone_no == '') {
        throw new Error("Invalid phone number input");
      }

      if (parentGender == '') {
        throw new Error("Please select a gender");
      }

        // ================Generate random password===============
        const password = generatePassword(12);
        console.log(password);

        // create parent and put in db
        const parent = await Parent.create({
          parentName,
          parentEmail,
          parentPhone_no,
          parentGender,
          password: password 
        })
        console.log(parent);

        // create student and put in db
        const student = await Student.create({
          studentName,
          regNo,
          studentPhone_no,
          studentEmail,
          gender,
          faculty, 
          dept, 
          level,
          password: password,
          parentId: parent._id  
        })
          console.log(student);
          
          const mailBody = `Your account has been created successfully. Please use the login
          credential below to log in to your account: <br> <br>
          Email: <b>${studentEmail}</b> <br>
          Password: <b>${password}</b> <br> <br>
          Click on the button below to login to your account <br><br>
          <a href="/login">Click here to login</a> `;

          // ===================Notify parent through email==================
          sendEmail(studentEmail, 'Account Created', mailBody)

          const parent_mailBody = `Your account has been created successfully. Please use the login
          credential below to log in to your account: <br> <br>
          Email: <b>${parentEmail}</b> <br>
          Password: <b>${password}</b> <br> <br>
          Click on the button below to login to your account <br><br>
          <a href="/login">Click here to login</a> `;

          // ===================Notify student through email==================
          sendEmail(parentEmail, 'Account Created', parent_mailBody)

          return res.status(200).json({
            success: true, 
            msg: 'Account created successfully',
            redirectURL: '/dashboard'
        });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  get_parents: async(req, res) => {
    const context = {}
    try {
      const _parents = await Parent.find();
      context['parents'] = _parents;      
      res.render("parents", {res, context});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  get_students: async(req, res) => {
    const context = {}
    try {
      const _students = await Student.find();
      context['students'] = _students;
      console.log(_students);
      res.render("students", {res, context});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  get_memos: async(req, res) => {
    const context = {}
    try {
      const _memos = await Memo.find();
      context['memos'] = _memos;
      res.render("memos", {res, context});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  get_memoForm: (req, res) => {
    res.render("memoForm");
  },
  post_memoForm: async(req, res) => {
    const {memoTitle, memoRef, memoBody} = req.body;
    const memoTitleReg = /^[a-zA-Z0-9\s.,-]{3,100}$/;
    const memoRefReg = /^[\w\s.,!?'"@#$%^&*()_\-+=:;<>]{10,1000}$/;
    try {
      if (!memoTitleReg.test(memoTitle)) {
       throw new Error("Invalid text format input");
      }
    
      if (!memoRefReg.test(memoRef)) {
        throw new Error("Invalid text format input");
      }
    
      if (memoBody == '') {
        throw new Error("Invalid text format input");
      }

       // Create user and put in db
       const memo = await Memo.create({
        memoTitle,
        memoRef,
        memoBody,
      });
      console.log(memo);

      return res.status(200).json({
        success: true,
        msg: "Memo posted successfully",
        redirectURL: "/memos",
      });
      
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
  view_edit_memo: async(req, res) => {
    const context = {}
    try {
      const _memoById = await Memo.findOne({_id: req.query.memoId});
      context['memoById'] = _memoById;
      res.render("edit_memo", {res, context});
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};
