let studentModel = require("../model/student");
let jwt = require("jsonwebtoken");

module.exports = {
  authentication: (req, res, next) => {
    try {
      let token = req.headers["authorization"];
      if (!token)
        return res
          .status(401)
          .send({ status: false, message: "User not LoggedIn" });
        
          token = token.replace("Bearer ", "");
         
      jwt.verify(token, "This-is-a-secret-key", (err, decoded) => {
        if (err)
          return res.status(400).send({ status: false, msg: "Invalid token" });
        req.payLoad = decoded;
        next();
      });
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  },

  authorization: async (req, res, next) => {
    try {
      let user = req.payLoad.userId;
      let student = req.params.studentId;
      let match = await studentModel.findOne({_id: student, isDeleted: false});
      if (!match)
        return res
          .status(400)
          .send({ status: false, msg: "No such student Exists." });
      if (match.user != user)
        return res
          .status(403)
          .send({ status: false, msg: "You are not Authorized." });
      next();
    } catch (e) {
      res.status(500).send({ status: false, msg: e.message });
    }
  },
};
