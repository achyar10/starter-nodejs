import express from 'express'
import * as user from './controllers/UserController'
import * as auth from './controllers/AuthController'

const route = express.Router()

// auth
route.route('/login').post(auth.login)

// User
route.route('/user').get(verifyToken, user.get)
route.route('/user').post(user.add)

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

export default route