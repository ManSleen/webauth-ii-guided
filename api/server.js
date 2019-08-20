const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionOptions = {
  cookie: {
    name: "example-cookie",
    secret: process.env.COOKIE_SECRET || "keep it safe!", // for encryption
    secure: process.env.COOKIE_SECURE || false, // in production this should be set to true, in development setting to false is fine
    maxAge: 1000 * 60 * 60, // how long is the session going to last, in ms
    httpOnly: true, // client JS has no access to the cookie
    resave: false,
    saveUninitialized: true
  }
}

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOptions))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
