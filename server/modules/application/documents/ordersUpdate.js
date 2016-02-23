import {Order} from './Order'

export function updateList(req, res, next) {

    Order.update({date: req.body.date, user: req.body.user},
        { $set: {date: req.body.date}, status: req.body.status, user: req.body.user},
        { upsert: true }, function(){});
    next();
    res.json({ok: true});

}