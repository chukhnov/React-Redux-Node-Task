import {Order} from './../documents/Order'

export function updateList(req, res, next) {
    //Order.findOneAndUpdate({date: req.body.date}, req.body, function (err, place) {
    //    //res.send(place);
    //    console.log("Access!", req.body)
    //});

    Order.update({date: req.body.date},
        { $set: {date: req.body.date}, status: req.body.status, user: req.body.user  },
        { upsert: true }, function(){});

}