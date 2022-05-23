import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const AdminSchema = new Schema({
  rule_manage_acc: {
    type: Boolean
  },
  rule_standard_admin: {
    type: Boolean
  },
  access_key: {
    type: String,
    required: true,
  },
  acc_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
})


export const AdminModel = model('Admin', AdminSchema)

export const AdminTC = composeMongoose(AdminModel)
