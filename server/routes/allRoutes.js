const express = require("express");
const client_route = express();
const clientController = require("../controllers/clientController");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const auth = require("../middleware/authenticate");

client_route.use(express.json());
client_route.use(bodyParser.json());
client_route.use(cookieParser());

client_route.post("/signup", clientController.register_router);
client_route.post("/login", clientController.login_router);
client_route.post("/addclient", auth, clientController.allclient);
client_route.get("/logout", clientController.logout);
client_route.get("/showclient", auth, clientController.showclient);
client_route.delete("/deleteclient/:id", auth, clientController.deleteClient);
client_route.get("/editclient/:id", auth, clientController.editClient);
client_route.patch("/updateclient/:id", auth, clientController.updateClient);
client_route.post("/forget-password", clientController.forget_password);
client_route.get(
  "/forget-password/:token",
  clientController.forget_password_get
);
client_route.post(
  "/reset-password-post/:token",
  clientController.reset_password_post
);

module.exports = client_route;
