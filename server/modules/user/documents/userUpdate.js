import User from './User'

export function updateUser(req, res, next) {

    User.findByIdAndUpdate(req.body.user,
        { $addToSet: {days: req.body.date}},
        { upsert: true}, function(){});
    next();
    res.json({ok: true});

}
