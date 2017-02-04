import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Customers = new Mongo.Collection('customers');

const CustomerSchema = new SimpleSchema({
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
    name: { // 顧客名
        type: String,
    },
    sales: { // 売上
        type: SimpleSchema.Integer,
        optional: true,
    },
    grossMargin: { // 粗利額
        type: SimpleSchema.Integer,
        optional: true,
    },
    saleCVariableVost: { // 営業変動費
        type: SimpleSchema.Integer,
        optional: true,
    },
    marginalProfit: { // 限界利益
        type: SimpleSchema.Integer,
        optional: true,
    },
    growingRatio: { // 過去3年平均成長率
        type: Number,
        optional: true,
    },
});

Customers.attachSchema(CustomerSchema);