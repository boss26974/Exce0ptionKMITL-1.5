import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const UserSchema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        bcrypt: true
    },
    studentid: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        enum: ['studying', 'graduated'] // ['กำลังศึกษาอยู่', 'จบการศึกษาแล้ว']ใช้ภาษาไทยแล้ว Error
    },
}, {
    timestamps: true
})

UserSchema.plugin(mongooseBcrypt)

export const UserModel = model('User', UserSchema)

export const UserTC = composeMongoose(UserModel)
