import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo'

export const Visitnotes = new Mongo.Collection('visitnotes')

let Schema = {}

Schema.VisitnoteOfferingSchema = new SimpleSchema({
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

Schema.VisitnoteAttenderSchema = new SimpleSchema({
    name: { // 氏名
        type: String,
    },
    role: { // キーパーソン, インフルエンサー, その他
        type: String,
        optional: true,
    },
    interest: { // 関心度, -2 ~ +2
        type: SimpleSchema.Integer,
        optional: true,
        defaultValue: 0,
    },
    memo: { // メモ
        type: String,
        optional: true,
    },
})

Schema.VisitnoteItemSchema = new SimpleSchema({
    kind: { // goal, method, homework, complaints, 
        type: String,
        optional: true,
    },
    isSelected: {
        type: Boolean,
        optional: true,
    },
    name: {
        type: String,
        optional: true,
    },
    todo: {
        type: String,
        optional: true,
    },
    did: {
        type: String,
        optional: true,
    },
    isAchieved: {
        type: Boolean,
        optional: true,
    },
})

Schema.VisitnoteSchema = new SimpleSchema({
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
        type: [Schema.VisitnoteOfferingSchema],
        optional: true,
    },
    postOfferings: { // 復習 商材
        type: [Schema.VisitnoteOfferingSchema],
        optional: true,
    },
    goals: { // pre/post, ゴール
        type: [Schema.VisitnoteItemSchema],
        optional: true,
    },
    methods: { // 方法論
        type: [Schema.VisitnoteItemSchema],
        optional: true,
    },
    homeworks: { // 宿題
        type: [Schema.VisitnoteItemSchema],
        optional: true,
    },
    complaints: { // クレーム処理
        type: [Schema.VisitnoteItemSchema],
        optional: true,
    },
    information: { // post, 情報, 共有が必要なもの
        type: String,
        optional: true,
    },
    preAttenders: { // 面談者
        type: [Schema.VisitnoteAttenderSchema],
        optional: true,
    },
    postAttenders: { // 面談者
        type: [Schema.VisitnoteAttenderSchema],
        optional: true,
    },
    preIsCommited: {
        type: Boolean,
        optional: true,
        defaultValue: false,
    },
    postIsCommited: {
        type: Boolean,
        optional: true,
        defaultValue: false,
    },
})

Visitnotes.attachSchema(Schema.VisitnoteSchema)