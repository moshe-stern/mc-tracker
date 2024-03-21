const express = require('express');
const http = require('http');
const io = require('socket.io');
const session = require('express-session');

const app = express();
const server = http.createServer(app);
const socketIo = io(server, {
  cors: 'http://localhost:3000'
});
const buildPath = './public'
app.use(express.static(buildPath));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 200000
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');
// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecatedErrors: true
  }
});

app.use(async (req, res, next) => {
  try {
    await client.connect();
    req.database = client.db('invoice-tracker');
    req.socketIo = socketIo;
    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.use(require('cors')({
  credentials: true,
  origin: 'http://localhost:5173'
}));
app.get('/', (req, res, next) => {
  res.sendFile(path.join(buildPath, 'index.html'))
})
app.use('/', require('./routes/authentication'));
app.use('/invoices', require('./routes/invoices'));

app.use(function (req, res, next) {
  const error = new Error('No such endpoint');
  error.statusCode = 404;
  next(error);
});

app.use(function (err, req, res, next) {
  res.status(err.statusCode || 500);
  res.send(err.message);
});

socketIo.on('connect', () => {
  console.log('got connection');
});

server.listen(8080);
