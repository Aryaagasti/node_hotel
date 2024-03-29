const express = require("express");
const { db, connect } = require('./db');
const bodyParser = require('body-parser')
const mongoose = require('mongoose'); // Assuming you're using Mongoose for MongoDB

const app = express();

// Connect to the database before starting the server
connect().then(() => {
  console.log("Connected to database successfully!");

  const MenuItem = require('./models/menuItem.model')

  app.use(bodyParser.json())

  app.get("/", (req, res) => {
    res.send("Welcome to my hotel.. how can I help you? We have a list of menu.");
  });

 


  //Import the router files
  const personRoutes = require("./routes/personRoutes")
  const menuRoutes = require("./routes/menuRoutes")

  //use the routers
  app.use("/person", personRoutes)
  app.use("/menu", menuRoutes)


  const PORT = process.env.PORT || 3000


  app.listen(PORT, () => {
    console.log("Listening on port 3000");
  });
}).catch(err => {
  console.error("Error connecting to database:", err);
  process.exit(1); // Exit the process on connection failure
});
