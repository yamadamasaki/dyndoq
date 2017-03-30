import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo'

export const Visits = new Mongo.Collection('visits')

const VisitSchema = new SimpleSchema({
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
    member: {
        type: String,
    },
    plannedDate: { // 計画日
        type: Date,
        optional: true,
    },
    isAppointed: { // アポ取得
        type: Boolean,
        defaultValue: false,
    },
    executedDate: { // 実績日
        type: Date,
        optional: true,
    },
    plannedValue: { // 粗利金額
        type: Number,
        optional: true,
    },
    actualValue: { // 粗利金額
        type: Number,
        optional: true,
    },
    goal: { // ゴール#
        type: Number,
        optional: true,
    },
    todo: { // 活動ゴール
        type: String,
        optional: true,
    },
    done: { // 活動ゴール
        type: String,
        optional: true,
    },
    isSuccess: { // ○×
        type: Boolean,
        defaultValue: false,
    },
    step: { // アプローチ, ... members#steps と整合性が必要?
        type: String,
        optional: true,
    },
    assignedStep: { // 本来割り当てられたアプローチ
        type: String,
        optional: true,
    },
    month: { // 月次
        type: SimpleSchema.Integer,
        optional: true,
    },
    customerGrade: { // 顧客区分
        type: String,
        optional: true,
    },
    department: { // Department Id
        type: String,
        optional: true,
    },
    attenders: { // 面談者
        type: [String], // 名前
        optional: true,
    },
    products: { // 製品
        type: [String], // Product Id
        optional: true,
    },
    issues: { // G100 クレーム, その他対応要事項
        type: [String],
        optional: true,
    },
    informations: { // 収集情報
        type: [String],
        optional: true,
    },
    hypotheses: { // 仮説
        type: [String],
        optional: true,
    },
})

Visits.attachSchema(VisitSchema)