const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
  name: String,
   role: {
    type: String,
    enum: ["manager", "admin", "employee","HR"], // Optional: add other roles
    default: "employee"
  },
  status: String,
  image: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hash
employeeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model('Employee', employeeSchema);
