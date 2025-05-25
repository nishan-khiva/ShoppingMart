const userAddress = require('../Models/UserAddressSchema')


exports.addAddress = async (req, res) => {
  try {
    const { phoneno, address, name, state, city, pincode } = req.body;
    const userId = req.user._id;

    const existingAddress = await userAddress.findOne({
      userId,
      phoneno,
      address,
      name,
      state,
      city,
      pincode
    });

    if (existingAddress) {
      return res.status(409).json({ message: 'Address already exists' });
    }

    const newAddress = new userAddress({
      userId,
      phoneno,
      address,
      name, state, city, pincode
    });

    await newAddress.save();

    res.status(201).json({ message: 'Address saved successfully', address: newAddress });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAddresses = async (req, res) => {
  try {
    const addresses = await userAddress.find({ userId: req.user._id });
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch addresses' });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    await userAddress.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { phoneno, address, name, state, city, pincode } = req.body;
    const updated = await userAddress.findByIdAndUpdate(
      req.params.id,
      { phoneno, address, name, state, city, pincode },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Address not found" });

    res.status(200).json({ message: "Address updated successfully", address: updated });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
};
