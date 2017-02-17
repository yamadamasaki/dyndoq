import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Smaps = new Mongo.Collection('smaps');

const SmapSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
    },
    _tenant: {
        type: String,
    },
    _service: {
        type: String,
    },
    _group: {
        type: String,
        defaultValue: 'default-group',
    },
    _owner: {
        type: String, // userId
        optional: true,
    },
    _timestamp: {
        type: SimpleSchema.Integer, // unix time
    },
    _description: {
        type: String, // 変更理由など
        optional: true,
    },
    financialYear: {
        type: SimpleSchema.Integer,
    },
    elementType: {
        type: String,
        allowedValues: ['products', 'customers'],
    },
    name: { // 区分名
        type: String,
        optional: true,
    },
    description: {
        type: String,
        optional: true,
    },
    color: {
        type: String,
        optional: true,
    },
    elements: { // 製品/顧客 の _id
        type: [String],
        optional: true,
    },
});

Smaps.attachSchema(SmapSchema);