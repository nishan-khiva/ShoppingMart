const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    }
  },
  {
    versionKey: false  
  }
);


module.exports = mongoose.model('Category', categorySchema);
