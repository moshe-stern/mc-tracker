import express, { static as static_ ,json, urlencoded } from 'express';
import { createServer } from 'http';
import io from 'socket.io';
import session from 'express-session';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { join } from 'path';

const app = express();
const server = createServer(app);
const socketIo = io(server, {
  cors: 'http://localhost:3000'
});
const buildPath = '../sales-tracker-client/dist'
app.use(static_(buildPath));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 200000
  }
}));

app.use(json());
app.use(urlencoded({ extended: false }));

// Replace the uri string with your connection string.
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.1';
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
  res.sendFile(join(buildPath, 'index.html'))
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
console.log('Server Listening on 8080')
