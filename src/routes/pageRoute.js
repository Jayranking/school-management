const express = require('express');
const route = express.Router();
const pageCont = require('../controllers/pageCont');

route.get('/', pageCont.index);
module.exports = route; 