const { config } = require("dotenv");
const express = require("express");
const cors = require("cors");
const { getUser, addUser } = require("./data.js");

config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  // validate input.
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return res.send('Invalid request.');
  }

  // validate user.
  const user = await getUser(email);
  if (user && user.password === password) {
    return res.send({
      firstName: user.firstName,
      lastName: user.lastName,
      email: email
    });
  }

  // no such user or incorrect password.
  res.status(401);
  return res.send('Invalid credentials.');
});

app.post('/register', async (req, res) => {
  // validate parameters.
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.status(400);
    return res.send('Invalid request.');
  }

  // check if user exists and if not, register
  const existing = await getUser(email);
  if (existing) {
    res.status(400);
    return res.send('User already registered.');
  }
  const user = await addUser(firstName, lastName, email, password);

  // send back details ... like login
  return res.send({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
});

app.post('/reset', (req, res) => {
  // this method does nothing
  const { email } = req.body;
  if (!email) {
    res.status(400);
    return res.send('Invalid request.');
  }

  return res.send({ sent: true });
});

app.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}...`),
);