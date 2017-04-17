import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Mongo } from 'meteor/mongo'

export const SalesStepsDefs = new Mongo.Collection('salesstepsdefs')

let Schema = {}

Schema.SalesStepDefSchema = new SimpleSchema({
    name: {
        type: String,
    },
    description: {
        type: String,
        optional: true,
    },
    goals: {
        type: [Object],
        optional: true,
    },
    'goals.$.name': {
        type: String,
    },
    'goals.$.description': {
        type: String,
        optional: true,
    },
    'goals.$.content': {
        type: String,
        optional: true,
    },
    methods: {
        type: [Object],
        optional: true,
    },
    'methods.$.name': {
        type: String,
    },
    'methods.$.description': {
        type: String,
        optional: true,
    },
    'methods.$.content': {
        type: String,
        optional: true,
    },
})

const SalesStepsDefSchema = new SimpleSchema({
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
    name: { // 定義名
        type: String,
    },
    steps: { // ステップ定義
        type: [Schema.SalesStepDefSchema],
        optional: true
    }
})

SalesStepsDefs.attachSchema(SalesStepsDefSchema)