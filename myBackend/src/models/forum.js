import { composeMongoose } from 'graphql-compose-mongoose'
import { model, Schema } from 'mongoose'

const ForumSchema = new Schema({
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
    image_path: {
        type: String,
        required: true
    },
    author_id: { //id ของผู้เขียน (Admin)
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    }
}, {
    timestamps: true,
})

export const ForumModel = model('Forum', ForumSchema)

export const ForumTC = composeMongoose(ForumModel)
