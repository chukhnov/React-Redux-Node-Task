import User from './User'

export function deleteDay(req, res, next) {

    User.findByIdAndUpdate(req.body.user,
        { $pull: {days: req.body.date}},
        { upsert: true}, function(){});
    next();
    res.json({ok: true});

}
