const express = require('express')
const router = express.Router();
const { verifyToken } = require('../Middleware/Auth');
const {addAddress, getAddresses,deleteAddress, updateAddress} = require('../Controller/UserAddressController')

router.post('/add', verifyToken, addAddress)
router.get('/my', verifyToken, getAddresses);
router.delete('/:id', verifyToken, deleteAddress);
router.put('/:id', verifyToken, updateAddress);


module.exports = router;