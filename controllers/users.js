const User = require("../models/users");

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    console.log(token)
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
  
};
const loginUser = async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token})
    if(user) {
      res.status(200).send("good")
    }
  } catch (error) {
    res.status(400).send(error)
   }   
   console.log(token)
}

module.exports = { createUser, loginUser };
