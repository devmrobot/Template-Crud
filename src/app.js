require("dotenv").config();
const connection = require("./db-config");
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index.routes");

const port = process.env.PORT || 8000;

connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", router);


const extractUserName = (req, res, next) => {
  if (req.query.name) {
    req.userName = req.query.name;
    next();
  } else {
    res.status(400)
       .send('You have to specify a "name" query parameter to call this route');
  }
};

app.get('/hello', extractUserName, (req, res) => {
 console.log('handling /hello');
 res.send(`Hello ${req.userName} !`);
});


app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
