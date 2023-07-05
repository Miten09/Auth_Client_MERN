const express = require("express");
const client_route = require("./routes/allRoutes");
const app = express();

require("./dbConnect");

app.use("/api", client_route);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
