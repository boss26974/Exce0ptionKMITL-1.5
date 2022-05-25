import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const PasscodeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    passcode: {
        type: String,
        required: true,
        bcrypt: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '15m'
    }
})

PasscodeSchema.plugin(mongooseBcrypt)

export const PasscodeModel = model('Passcode', PasscodeSchema)

export const PasscodeTC = composeMongoose(PasscodeModel)