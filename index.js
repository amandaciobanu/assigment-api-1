import { config } from "dotenv";
import express from 'express';
import cors from 'cors';
import { getUser, addUser } from './data.js'

config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  // validate input.
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    return res.send('Invalid request.');
  }

  // validate user.
  const user = getUser(email);
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

app.post('/register', (req, res) => {
  // validate parameters.
  const { firstName, lastName, email, password } = req.body;
  if (!email || !password || !firstName || !lastName) {
    res.status(400);
    return res.send('Invalid request.');
  }

  // check if user exists and if not, register
  const existing = getUser(email);
  if (existing) {
    res.status(400);
    return res.send('User already registered.');
  }
  addUser(firstName, lastName, email, password);

  // send back details ... like login
  return res.send({
    firstName,
    lastName,
    email
  });
});

app.post('/reset', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}...`),
);