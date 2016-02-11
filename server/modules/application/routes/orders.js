import {Order} from './../documents/Order'


export function getList(req, res, next) {
    Order.find({
        user: req.user._id
    })
        .exec()
        .then((list, err) => {
            if (err) {
                next()
            } else {
                res.json({ok: true,
                    data: list, user: req.user});
            }
        })
}