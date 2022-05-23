import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const UserSchema = new Schema({
  user_studentid: {
    type: String,
    required: true,
    unique: true
  },
  user_status: {
    type: String,
    enum: ['studying', 'graduated'] // ['กำลังศึกษาอยู่', 'จบการศึกษาแล้ว']ใช้ภาษาไทยแล้ว Error
  },
  acc_id: {
    type: Schema.Types.ObjectId,
    ref: 'Account'
  }
})


export const UserModel = model('User', UserSchema)

export const UserTC = composeMongoose(UserModel)
