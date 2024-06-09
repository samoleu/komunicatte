require("dotenv").config();

const express = require("express");
const exampleRoute = require("./routes/exampleRoute");
const chatRoute = require("./routes/chatRoute");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(express.json());
app.use("/api/example", exampleRoute);
app.use("/api/chat", chatRoute);

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});
