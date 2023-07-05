const jwt = require("jsonwebtoken");
const User = require("../models/register_model");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // console.log(token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    // console.log(verifyToken);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
    });
    if (!rootUser) {
      return res.status(404).send("User not found");
    } else {
      req.rootUser = rootUser;
      next();
    }
  } catch (error) {
    res.status(404).send("No token provided");
  }
};

module.exports = authenticate;
