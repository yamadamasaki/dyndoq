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
    isSuccessful: { // ○×
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
})

Visits.attachSchema(VisitSchema)