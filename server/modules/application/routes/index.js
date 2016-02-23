import {Router} from 'express'
import {getList} from './../documents/orders'
import {updateList} from './../documents/ordersUpdate'
import {updateUser} from '../../user/documents/userUpdate'
import {deleteDay} from '../../user/documents/userDeleteDay'
export const routes = Router();

export const getUser = (req, res, next) => {
    req.user = req.session.user && JSON.parse(req.session.user);
    next()
};

const checkAccess = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(403).json({
            ok: false,
            error: 403,
            message: "Access Denied"
        })

    }
};

routes.get('/api/1/orders', checkAccess, getUser, getList);
routes.post('/api/1/update', updateList);
routes.post('/api/1/updateUser', updateUser);
routes.post('/api/1/deleteDay', deleteDay);