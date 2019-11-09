import users from '../models/UserModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = (req, res) => {
    users.find({ email: req.body.email }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                status: false,
                result: err
            })
        }
        if (user.length < 1) {
            return res.status(200).json({
                status: false,
                result: 'Email not registered!'
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (error, result) => {
                if (error) {
                    return res.status(200).json({
                        status: false,
                        result: error
                    })
                }
                if (result) {
                    const userload = {
                        id: user[0]._id,
                        email: user[0].email,
                        fullname: user[0].fullname
                    }
                    jwt.sign({ userload }, 'secretkey', { expiresIn: '3600s' }, (err, token) => {
                        return res.status(200).json({
                            status: true,
                            result: {
                                id: user[0]._id,
                                email: user[0].email,
                                password: user[0].password,
                                fullname: user[0].fullname,
                                token: token
                            }
                        })
                    })
                } else {
                    return res.status(200).json({
                        status: false,
                        result: 'Wrong Password!'
                    })
                }
            })
        }
    })
}