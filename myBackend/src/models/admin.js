import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'
import mongooseBcrypt from 'mongoose-bcrypt'

const AdminSchema = new Schema({
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
  role_manage_admin_acc: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
})

AdminSchema.plugin(mongooseBcrypt)

export const AdminModel = model('Admin', AdminSchema)

export const AdminTC = composeMongoose(AdminModel)
