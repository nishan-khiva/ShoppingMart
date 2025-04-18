const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema({
    productimage: {
        type: String,
    },
    productname: {
        type: String,
        required: true,
    },
    productdesc: {
        type: String,
    },
    productcategory:{
        type:String,
        required:true,
    },
    productprice:{
        type:Number,
        required:true,
    },
    sellprice:{
        type:Number,
        required:true,
    }
})

module.exports = mongoose.model('Product', Products);