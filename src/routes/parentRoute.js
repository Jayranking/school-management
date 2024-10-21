const express = require('express');
const route = express.Router();
const parentCont = require('../controllers/parentCont');

route.get('/parent-dashboard',  parentCont.parent_dashboard);  

route.get('/parent-memo', parentCont.parent_memo);

route.get('/parent-login', parentCont.parent_login);
route.post('/parent-login', parentCont.login);
route.get('/logout', parentCont.parent_logout);

module.exports = route;