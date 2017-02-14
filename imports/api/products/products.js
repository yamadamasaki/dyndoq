import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

const ProductSchema = new SimpleSchema({
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
    name: { // 商品名
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
});

Products.attachSchema(ProductSchema);