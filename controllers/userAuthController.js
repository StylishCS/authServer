const { User } = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function signupUserController(req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json("Email Address Already Exists.");
    }
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await user.save();
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    return res.status(201).json(userWithoutPassword._doc);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function loginUserController(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("Wrong Email or Password");
    }
    const valid = bcrypt.compareSync(req.body.password, user.password);
    if (!valid) {
      return res.status(404).json("Wrong Email or Password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "18h",
    });
    let userWithoutPassword = { ...user };
    delete userWithoutPassword._doc.password;
    return res
      .status(200)
      .json({ user: userWithoutPassword._doc, token: token });
  } catch (error) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { loginUserController, signupUserController };
