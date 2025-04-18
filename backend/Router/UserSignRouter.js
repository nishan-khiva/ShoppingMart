const express = require('express');
const router = express.Router();
const usersigncontroller = require('../Controller/UserSignController')

//Create a new user
router.post('/sign', usersigncontroller.signdetail)
router.post('/login',usersigncontroller.userlogin)

module.exports = router;