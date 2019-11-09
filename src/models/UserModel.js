import mongoose from 'mongoose'

const user = mongoose.Schema({

    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true,
        default: null
    },
    fullname: {
        type: String,
        required: true,
        default: null
    },
    role: {
        type: String,
        required: true,
        default: 'SUPERADMIN'
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model('user', user)