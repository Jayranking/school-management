const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Student = require("../models/student");
const Parent = require("../models/parent");

const checkAdmin = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) { 
        return res.redirect('/sign-in');
    }

    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
        if (error) {
            // Handle both token expiration and any other errors
            return res.redirect('/sign-in');
        }

        try {
            const _admin = await Admin.findOne({_id: decodedToken.id}, {password: 0});
            if (_admin) {
                req.admin = decodedToken.id;  // Assign admin ID to request object
                res.locals.admin = _admin;    // Assign admin object to local variables for views
                next();
            } else {
                res.locals.admin = null;
                return res.redirect('/sign-in');
            }
        } catch (err) {
            // Handle possible database errors
            console.error(err);
            return res.redirect('/sign-in');
        }
    });
};

const checkStudent = (req, res, next) => {

    const token = req.cookies.jwt;
    // console.log(token);

    if (!token) {
        return res.redirect('/student-login');
    }   

    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async(error, decodedToken) => {    
            if (error) {
                if (error.message == 'jwt expired') {
                    return res.redirect('/student-login');
                }
                return res.redirect('/student-login');
            }
           try {
                const _student = await Student.findOne({_id: decodedToken.id}, {password: 0});
                if (_student) {
                    req.student = decodedToken.id;
                    res.locals.student = _student;
                } else {
                    res.locals.student = null;
                    return res.redirect('/student-login');
                }
            } catch (err) {
                // Handle possible database errors
                console.error(err);
                return res.redirect('/student-login');
            }
        });
    }

}

const checkParent = (req, res, next) => {

    const token = req.cookies.jwt;
    // console.log(token);

    if (!token) {
        return res.redirect('/parent-login');
    }   

  
    jwt.verify(token, process.env.TOKEN_SECRET, async (error, decodedToken) => {
        if (error) {
            // Handle both token expiration and any other errors
            return res.redirect('/parent-login');
        }

        try {
            const _parent = await Parent.findOne({_id: decodedToken.id}, {password: 0});
            if (_parent) {
                req.parent = decodedToken.id;  
                res.locals.parent = _parent;   
            } else {
                res.locals.parent = null;
                return res.redirect('/parent-login');
            }
        } catch (err) {
            // Handle possible database errors
            console.error(err);
            return res.redirect('/parent-login');
        }
    });

}

module.exports = { checkAdmin, checkStudent, checkParent };
