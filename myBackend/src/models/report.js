import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const ReportSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['sociality', 'studying', 'scholarship', 'register_system', 'environment'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    target: { //sociality, environment = Place / studying,register_system = SubjectId / scholarship = scholarshipType
        type: String,
        required: true
    },
    condition_of_submission: {
        type: String,
        enum: ['Not Urgent', 'Urgent'],
        required: true
    },
    submission_status: {
        type: String,
        enum: ['Received', 'In-Progress', 'Declined', 'Accepted', 'Completed'], //ได้รับคำร้อง กำลังตรวจสอบ ปฏิเสธ รับไปแก้ไข สำเร็จ
        default: "Received",
    },
    complainer_id: { //id ของผู้ร้องเรียน (User)
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true,
})

export const ReportModel = model('Report', ReportSchema)

export const ReportTC = composeMongoose(ReportModel)
