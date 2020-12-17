import { config } from "dotenv";
import express from 'express';
import { getUser, addUser } from './data.js'

config();

const app = express();
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
  return res.send('Received a GET HTTP method');
});

app.post('/reset', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.listen(process.env.PORT, () =>
    console.log(`API listening on port ${process.env.PORT}...`),
);