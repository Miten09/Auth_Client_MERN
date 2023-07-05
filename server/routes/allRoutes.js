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
client_route.get("/allclient", auth, clientController.allclient);
client_route.get("/logout", clientController.logout);

module.exports = client_route;