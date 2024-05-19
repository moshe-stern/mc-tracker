import { ObjectId } from "mongodb";
export async function addEditInvoice(req, res, next) {
    try {
        const result = await req.users.updateOne({ _id: new ObjectId(req.params.id) }, { $push: { invoices: req.body } });
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
}
export 