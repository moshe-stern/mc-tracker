import { Router } from 'express';
const router = Router();
import { ObjectId } from 'mongodb';
import Invoice from './invoice';
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
  .post(async (req, res, next) => Invoice.addEditInvoice(req, res, next))
  .put(async (req, res, next) => Invoice.addEditInvoice(req, res, next))
export default router;
