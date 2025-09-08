const {
  createCustomerService,
  loginService,
} = require("../services/userService");
const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (user) {
      console.log(`User exist ${email}`);
      res.status(200).json({ Error: "User exist", user });
      return;
    }

    const data = await createCustomerService(name, email, password);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    await res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.find({}).select("-password");
    await res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  handleLogin,
  getUser,
};
