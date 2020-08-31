// Sets up the express app
const express = require("express");

const cors = require("cors");

// const mongojs = require("mongojs");
// const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
// const allRoutes = require("./controllers");

// Requiring our models for syncing
// const db = require("./models");

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// developing
// app.use(
//   cors({
//     options: ["http://localhost:3000/"],
//   })
// );

// deployed site
app.use(
  cors({
    options: ["https://dion-leung-portfolio.herokuapp.com/"],
  })
);

// Static directory
// app.use(express.static("public"));

// const exphbs = require("express-handlebars");
// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// app.use("/", allRoutes);

app.get("/", (req, res) => {
  res.send(
    `This backend does not serve data, only handles nodemailer requests. My favorite pokemon is ${process.env.POKEMON}`
  );
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
/*

app.get("/all", (req, res) => {
  db.contacts.find({}, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

app.post("/submit", (req, res) => {
  db.contacts.insert(
    {
      // hello: req.body.test,
      call: req.body.call,
      email: req.body.email,
      emailAddress: req.body.emailAddress,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      message: req.body.message,
      phNum: req.body.phNum,
      subject: req.body.subject,
      text: req.body.text,
      date: Date.now(),
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    }
    );
    // );
  });
  */

app.post("/email", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: "no-reply@gmail.com",
      // Need to create a dummy email account to use here
      // find out how to protect them in process.env?
      user: process.env.EMAIL,
      // pass: "testpassword",
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: `${req.body.emailAddress}`,
    to: "kungfumastah.dion@gmail.com",
    subject: `Message from portfolio: ${req.body.subject}`,
    text: `Here is a message from your portfolio!
    From: ${req.body.firstName} ${
      req.body.lastName ? req.body.lastName : "Doe"
    } \n
    Email: ${req.body.emailAddress} \n
    Subject: ${req.body.subject} \n
    Message: ${req.body.message} \n
    Phone number: ${
      req.body.phNum ? req.body.phNum : "no return number left"
    } \n
    Contact method(s): email? ${req.body.email ? "Yes" : "No"}; call? ${
      req.body.call ? "Yes" : "No"
    }; text? ${req.body.text ? "Yes" : "No"} \n
    Received at: ${Date(req.body.date)}
    `,
    // replyTo: `${req.body.emailAddress}`,
  };
  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.error("there was an error: ", err);
      res.status(500).end();
    } else {
      console.log("here is the data: ", data);
      // res.status(200).send(req.body);
      res.status(200).send("completed");
    }
  });
});
