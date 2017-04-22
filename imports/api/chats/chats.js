import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo'

export const Chats = new Mongo.Collection(null)

const ChatSchema = new SimpleSchema({
    user: { // User._id
        type: String
    },
    authToken: {
        type: String,
        optional: true,
    },
    userId: {
        type: String,
        optional: true,
    },
})

Chats.attachSchema(ChatSchema)