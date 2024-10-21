const Student = require("../models/student");
const jwt = require("jsonwebtoken");
const Memo = require("../models/memo");


module.exports = {
    student_dashboard: (req, res) => {
        res.render('student_dashboard')
    },

    student_login: (req, res) => {
        res.render('student_sign_in')
    },

    login: async(req, res) =>{
        const {studentEmail, password} = req.body;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordReg = /^(?:[0-9A-Za-z!@#$%^&*()\-+=_{}\[\]|:;"'<>,.?\\/ ])+$/;

        try {
            if (!emailReg.test(studentEmail)) {
                throw new Error('Enter Valid Email Address');
           };
           
           if (!passwordReg.test(password)) {
                throw new Error ('Incorrect Password');
           }

            // invoke the static login method
            const isLoggedIn = await Student.login(studentEmail, password)
            // console.log(isLoggedIn)

            if (isLoggedIn) {
                // Generate JWT token
                const token = jwt.sign({id: isLoggedIn._id}, process.env.TOKEN_SECRET,
                    {expiresIn: 1000 * 60 * 60 * 24}
                )
                
                // console.log(token);
                // send JWT to cookie
                res.cookie('jwt', token, {maxAge: 4000 * 60 * 60 * 24}); 

                return res.status(200).json({
                    success: true, 
                    msg:'Login Successfully',
                    redirectURL : '/student-dashboard',
                    // student: isLoggedIn
                });
            }else{
                throw new Error('Invalid Credentials');
            }
        } catch (error) {
            return res.status(401).json({error: error.message})
        }
    },

    student_memo: async(req, res) => {
        const context = {};
        
        try {
            const _studentMemo = await Memo.find()
            context['studentMemo'] = _studentMemo;
            console.log(_studentMemo);
            

            res.render('student_memo',{res, context})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },

    student_logout: (req, res) => {
        res.cookie('jwt', "", {maxAge: 4});
        res.redirect('/student-login')
    },
}