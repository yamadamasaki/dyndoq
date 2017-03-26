import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo'

export const SmapsDetail = new Mongo.Collection('smaps_detail')

const SmapsDetailSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
    },
    customerId: { // customers._id or smaps._id (when newCustomers == true)
        type: String, // _id
    },
    productId: {
        type: String, // _id
    },
    grossMargin: { // 粗利額
        type: SimpleSchema.Integer,
        optional: true,
    },
    grossMarginRate: { // 粗利率
        type: SimpleSchema.Integer,
        optional: true,
    },
    sales: { // 売上
        type: SimpleSchema.Integer,
        optional: true,
    },
    marginalProfit: { // 限界利益
        type: SimpleSchema.Integer,
        optional: true,
    },
    marginalProfitRate: { // 限界利益率
        type: SimpleSchema.Integer,
        optional: true,
    },
    variableCost: { // 変動費
        type: SimpleSchema.Integer,
        optional: true,
    },
    variableCostRate: { // 変動費率
        type: SimpleSchema.Integer,
        optional: true,
    },
    growthRate: { // 過去3年平均成長率
        type: Number,
        optional: true,
    },
    stock: { // 在庫
        type: Number,
        optional: true,
    },
})

SmapsDetail.attachSchema(SmapsDetailSchema)