import { Router } from 'express';
const router = Router();
import { hash as _hash, compare } from 'bcrypt';

router.use(async (req, res, next) => {
  req.users = await req.database.collection('users');
  next();
});

router.post('/register', (async (req, res, next) => {
  try {
    const hash = await _hash(req.body.password, 10);
    const confirmHash = await _hash(req.body.confirmPassword, 10);
    if (await compare(hash, confirmHash)) return next(new Error(`Passwords don't match`));
    /*db.users.getIndexes()
    db.users.dropIndex('username_1')
    db.users.createIndex({ username: 1 }, { unique: true })*/
    await req.users.insertOne({ userName: req.body.userName, password: hash, invoices: [] });
    res.sendStatus(201);
  } catch (err) {
    if (err.code === 11000) {
      return next(new Error(`${req.body.userName} is already taken. Please try a different name`));
    }
    return next(err);
  }
}));

router.post('/login', async (req, res, next) => {
  try {
    const results = await req.users.findOne({ userName: req.body.userName });
    if (!results) {
      throw new Error('Bad username and/or password');
    }
    if (!await compare(req.body.password, results.password)) {
      throw new Error('Bad username and/or password');
    }
    req.session.userName = req.body.userName;
    console.log(req.session.userName)
    res.send({ userId: results._id });
  } catch (err) {
    err.statusCode = 401;
    return next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

export default router;
