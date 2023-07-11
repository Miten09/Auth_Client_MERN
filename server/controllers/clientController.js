const User = require("../models/register_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const ClientData = require("../models/client_dashboard_model");
const nodemailer = require("nodemailer");
const config = require("../config");

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: config.emailUser,
        pass: config.emailPassword,
      },
    });

    const mailOptions = {
      from: config.emailUser,
      to: email,
      subject: "For Reset Password",
      html: `<p>Hiii ${name} Please copy the link and<a href="http://localhost:3000/api/reset-password/${token}">Reset your password</a> This link has been expired in 2 minutes<p/>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been Sent :", info.response);
      }
    });
  } catch (error) {
    // res.send(400).send({ success: false, msg: error.message });
    console.log(error);
  }
};

const securePassword = async (password) => {
  try {
    const hashedPassword = bcryptjs.hash(password, 12);
    return hashedPassword;
  } catch (error) {
    res.status(400).send({ err: message });
  }
};

const generateAuthtoken = async (_id) => {
  try {
    const token = jwt.sign({ _id }, process.env.SECRET_KEY);
    return token;
  } catch (error) {
    console.log(error);
    res.status(404).send({ err: error.message });
  }
};

const register_router = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).send({ err: "Plzz fil all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(402).send({ err: "Email already registered" });
    } else {
      const spassword = await securePassword(password);
      const newUser = await User.create({
        name,
        email,
        password: spassword,
      });
      const data = await newUser.save();
      res.status(200).send({ data: data });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const login_router = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ error: "Plzz fill all fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const unhashpassword = await bcryptjs.compare(
        password,
        existingUser.password
      );
      if (!unhashpassword) {
        return res.status(402).send({ error: "Password is incorrect" });
      } else {
        const token = await generateAuthtoken(existingUser._id);
        res.cookie("jwtoken", token, {
          expiresIn: "15s",
          httpOnly: true,
        });
        res
          .status(200)
          .send({ success: "Login Succesfully", data: existingUser, token });
      }
    } else {
      return res
        .status(401)
        .send({ error: "User Does not exist Plzz Signup First" });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const allclient = async (req, res) => {
  const { name, role, email, contact } = req.body;
  if (!name || !role || !email || !contact) {
    return res.status(401).send({ error: "Plzz fill all fields" });
  }
  try {
    const existingEmail = await ClientData.findOne({ email });
    if (existingEmail) {
      return res
        .status(403)
        .send({ error: "This email already exists try another one" });
    } else {
      const createClientData = new ClientData({
        name,
        role,
        email,
        contact,
      });
      if (!createClientData) {
        return res.status(404).send({ error: "No Client Found" });
      } else {
        const data = await createClientData.save();
        res.status(200).send(data);
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const showclient = async (req, res) => {
  try {
    const showclientData = await ClientData.find();
    res.status(200).send({ data: showclientData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteClient = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteData = await ClientData.findByIdAndDelete({ _id });
    res.status(200).send({ data: deleteData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const editClient = async (req, res) => {
  try {
    const _id = req.params.id;
    const showEditData = await ClientData.findById({ _id });
    res.status(200).send({ data: showEditData });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateClient = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateClient = await ClientData.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({ data: updateClient });
  } catch (error) {
    res.status(400).send(error);
  }
};

const forget_password = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(403).send({ err: "Plzz fill email" });
    }
    const userData = await User.findOne({ email: email });
    if (userData) {
      const token = jwt.sign({ _id: userData._id }, process.env.SECRET_KEY, {
        expiresIn: "40s",
      });
      const data = await User.updateOne(
        { email: email },
        { $set: { token: token } }
      );
      sendResetPasswordMail(userData.name, userData.email, token);
      res.status(200).send({
        success: true,
        msg: "Please check your inbox of mail and reset your password",
      });
    } else {
      res
        .status(402)
        .send({ success: true, msg: "This email does not exists" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const reset_password_post = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await User.findOne({ token });
    const verifyToken = jwt.verify(tokenData.token, process.env.SECRET_KEY);
    console.log(verifyToken);
    if (verifyToken) {
      const password = req.body.password;
      const newPassword = await securePassword(password);
      const userData = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res.status(200).send({
        success: true,
        msg: "User password has been reset",
        data: userData,
      });
    } else {
      res
        .status(401)
        .send({ success: false, msg: "This link has been expired." });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const forget_password_get = async (req, res) => {
  try {
    const token = req.params.token;
    const tokenData = await User.findOne({ token });
    const verifyToken = jwt.verify(tokenData.token, process.env.SECRET_KEY);
    console.log(verifyToken);
    if (verifyToken) {
      return res.status(200).send({ success: true, msg: "Valid User" });
    } else {
      res.status(401).send({ err: "Invalid User" });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(201).json({
    message: "user logout",
  });
};

module.exports = {
  register_router,
  login_router,
  allclient,
  showclient,
  logout,
  deleteClient,
  editClient,
  updateClient,
  forget_password,
  forget_password_get,
  reset_password_post,
};
