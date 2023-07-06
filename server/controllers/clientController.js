const User = require("../models/register_model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const ClientData = require("../models/client_dashboard_model");

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
  const { name, role, email, phone, city } = req.body;
  if (!name || !role || !email || !phone || !city) {
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
        phone,
        city,
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
};
