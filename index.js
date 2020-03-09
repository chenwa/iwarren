// index.js

/**
 * Required External Modules
 */
const express = require("express");
const nodemailer = require('nodemailer');

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'warrenhualinchen@gmail.com',
    pass: 'Ka4rs&tug'
  }
});

/**
 *  App Configuration
 */
app.use(express.static('public'));
app.use(express.urlencoded());


/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
  res.redirect('/index.html');
});

app.post("/contact.html", (req, res) => {
  const formSubject = req.body.name + " - " +
    req.body.email + " - " + req.body.subject;
  const formMessage = req.body.message;

  const mailOptions = {
    from: 'warrenhualinchen@gmail.com',
    to: 'heyimwchen@gmail.com',
    subject: formSubject,
    text: formMessage 
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
   
  res.redirect('/contact.html');
});

/**
 * Server Activation 
 */
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
