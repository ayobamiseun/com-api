const User = require("../models/users");
const {sendOTP} =  require("./otpController")
const {getUserInfo} = require('../utils/getUserInfo')
const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
   
    const token = await user.generateAuthToken();
    console.log(token)
     const customSuccessMessage = "Account Created Successfully";
     await sendOTP(req, res, customSuccessMessage);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
  
};
const loginUser = async (req, res) => {
  const cookie = req.cookies
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token, cookie})
  } catch (error) {
    res.status(400).send(error)
   }   
  
}

module.exports = { createUser, loginUser };
