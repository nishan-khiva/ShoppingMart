const express = require('express');
const router = express.Router();
const usersigncontroller = require('../Controller/UserSignController')
const { verifyToken } = require('../Middleware/Auth');

//Create a new user
router.post('/sign', usersigncontroller.signdetail)
router.post('/login',usersigncontroller.userlogin)
router.put('/updateprofile/:id', verifyToken, usersigncontroller.userUpdate)

module.exports = router;