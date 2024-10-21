const Parent = require("../models/parent");
const jwt = require("jsonwebtoken");
const Memo = require("../models/memo");


module.exports = {
    parent_dashboard: (req, res) => {
        res.render('parent_dashboard')
    },

    parent_login: (req, res) => {
        res.render('parent_sign_in')
    },

    login: async(req, res) =>{
        const {parentEmail, password} = req.body;
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const passwordReg = /^(?:[0-9A-Za-z!@#$%^&*()\-+=_{}\[\]|:;"'<>,.?\\/ ])+$/;

        try {
            if (!emailReg.test(parentEmail)) {
                throw new Error('Enter Valid Email Address');
           };
           
           if (!passwordReg.test(password)) {
                throw new Error ('Incorrect Password');
           }

            // invoke the static login method
            const isLoggedIn = await Parent.login(parentEmail, password)
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
                    redirectURL : '/parent-dashboard',
                    // parent: isLoggedIn
                });
            }else{
                throw new Error('Invalid Credentials');
            }
        } catch (error) {
            return res.status(401).json({error: error.message})
        }
    },

    parent_memo: async(req, res) => {
        const context = {};
        
        try {
            const _parentMemo = await Memo.find()
            context['parentMemo'] = _parentMemo;
            console.log(_parentMemo);
            

            res.render('parent_memo',{res, context})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    },

    parent_logout: (req, res) => {
        res.cookie('jwt', "", {maxAge: 4});
        res.redirect('/parent-login')
    },
}