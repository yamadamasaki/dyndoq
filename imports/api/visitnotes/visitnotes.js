import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo'

export const Visitnotes = new Mongo.Collection('visitnotes')

let Schema = {}

Schema.VisitnotesOfferingsSchema = new SimpleSchema({
    product: {
        type: String, // Products._id
    },
    unitPrice: { // 単価
        type: SimpleSchema.Integer,
        optional: true,
    },
    quantity: { // 数量
        type: Number,
        decimal: true,
        optional: true,
    },
    unitPrice: { // 単価
        type: SimpleSchema.Integer,
        optional: true,
    },
    cost: { // 原価
        type: SimpleSchema.Integer,
        optional: true,
    },
    expectedOrderMonth: { // 受注見込み月
        type: String, // 2017/09, 正規化はUI側で
        optional: true,
    },
    comment: { // コメント
        type: String,
        optional: true,
    }
    // 売上, 粗利, 粗利率は上記から算出
})

Schema.VisitnotesAttendersSchema = new SimpleSchema({
    name: { // 氏名
        type: String,
        optional: true,
    },
    role: { // キーパーソン, インフルエンサー, その他
        type: String,
        optional: true,
    },
    interest: { // 関心度, -2 ~ +2
        type: SimpleSchema.Integer,
        optional: true,
    },
})

Schema.VisitnotesGoalsSchema = new SimpleSchema({
    'goal#': { // Goal#
        type: SimpleSchema.Integer,
        optional: true,
    },
    goal: { // Goal 文言
        type: String,
        optional: true,
    },
    'method#': { // 方法#
        type: SimpleSchema.Integer,
        optional: true,
    },
    method: { // 方法 文言
        type: String,
        optional: true,
    },
    todo: { // やること
        type: String,
        optional: true,
    },
    did: { // やったこと
        type: String,
        optional: true,
    },
    isAchieved: { // 達成
        type: Boolean,
        optional: true,
    },
})

Schema.VisitnotesSchema = new SimpleSchema({
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
        defaultValue: () => new Date().getTime(),
    },
    _description: {
        type: String, // 変更理由など
        optional: true,
    },
    financialYear: {
        type: SimpleSchema.Integer,
    },
    visit: {
        type: String, // Visits._id
    },
    preOfferings: { // 予習 商材
        type: [Schema.VisitnotesOfferingsSchema],
        optional: true,
    },
    postOfferings: { // 復習 商材
        type: [Schema.VisitnotesOfferingsSchema],
        optional: true,
    },
    goals: { // ゴール
        type: [Schema.VisitnotesGoalsSchema],
        optional: true,
    },
    memo: { // メモ
        type: String,
        optional: true,
    },
    information: { // 情報
        type: String,
        optional: true,
    },
    attenders: { // 面談者
        type: [Schema.VisitnotesAttendersSchema],
        optional: true,
    },
})

Visitnotes.attachSchema(Schema.VisitnotesSchema)