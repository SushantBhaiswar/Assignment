const userModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

module.exports = {
  createUser: async (req, res) => {
    try {
      let { email } = req.body;
      let uniqEmail = await userModel.findOne({ email });
      if (uniqEmail)
        return res
          .status(400)
          .send({ status: false, msg: "Email already registered." });
      const salt = await bcrypt.genSalt(10)
      const hashpass = await bcrypt.hash(req.body.password, salt)
      req.body.password = hashpass
      let createUser = await userModel.create(req.body);
      res.status(201).send({ status: true, data: createUser });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  },

  login: async (req, res) => {
    try {
      let { email, password } = req.body;
      let loginUser = await userModel.findOne({ email: email });
      if (!loginUser)
        return res
          .status(400)
          .send({ status: false, msg: "Invalid Credentials." });
      let compare = await bcrypt.compare(password, loginUser.password)
      if (!compare) return res.status(400).send({ status: false, message: "Invalid credentials" })


      let token = jwt.sign({ userId: loginUser._id }, "This-is-a-secret-key", {
        expiresIn: "2d",
      });
      res.status(200).send({ status: true, token: token });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  },
};
