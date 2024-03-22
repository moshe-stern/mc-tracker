const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId
router.use(async (req, res, next) => {
  console.log(req.session.userName)
  if (!req.session.userName) {
    next(new Error('Not logged in'))
  }
  next();
})
router.route('/:id')
  .get(async function (req, res, next) {
    try {
      const user = await req.users.findOne({ _id: new ObjectId(req.params.id) });
      res.send(user.invoices);
    } catch (err) {
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const result = await req.users.updateOne({_id: new ObjectId(req.params.id) }, { $push: { invoices: req.body } });
      if (!result.modifiedCount > 0) {
        return next(new Error('oops, failed to add invoice'));
      }
      req.socketIo.emit('invoice', req.body);
      res.status(201)
        .send(req.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const result = await req.users.updateOne({_id: new ObjectId(req.params.id) }, { $push: { invoices: req.body } });
      if (!result.modifiedCount > 0) {
        return next(new Error('oops, failed to edit invoice'));
      }
      req.socketIo.emit('invoice', req.body);
      res.status(201)
        .send(req.body);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
module.exports = router;
