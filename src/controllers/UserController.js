import users from '../models/UserModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const get = (req, res) => {
    jwt.verify(req.token, 'secretkey', (err) => {
        if (err) {
            return res.status(403).json({
                status: false,
                result: 'Invalid Token'
            })
        }
        users.find().exec((error, user) => {
            if (error) {
                return res.status(400).json({
                    status: false,
                    result: error
                })
            }
            return res.json({
                status: true,
                result: user
            })
        })
    })
}

export const list = async (req, res) => {

    const user = await users.findOne({ email: 'usr@admin.com' })
    return res.json({
        status: true,
        result: user
    })

}

export const add = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const data = {
                email: req.body.email,
                password: hash,
                fullname: req.body.fullname,
                role: req.body.role
            }
            const add = new users(data)
            add.save((error, user) => {
                if (error) {
                    return res.status(400).json({
                        status: false,
                        result: error
                    })
                }
                return res.json({
                    status: true,
                    result: user
                })
            })
        }
    })
}