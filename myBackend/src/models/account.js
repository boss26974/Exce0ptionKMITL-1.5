import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const AccountSchema = new Schema({
  //acc_id ใช้จาก _id
  acc_fname: {
    type: String,
    required: true,
  },
  acc_lname: {
    type: String,
    required: true
  },
  acc_email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  acc_password: {
    type: String,
    required: true,
    bcrypt: true
  },
}, {
  timestamps: true, //automatic add field createdAt and updatedAt
})

AccountSchema.plugin(mongooseBcrypt)

export const AccountModel = model('Account', AccountSchema)

export const AccountTC = composeMongoose(AccountModel)
