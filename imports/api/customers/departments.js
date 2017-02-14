import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Departments = new Mongo.Collection('departments');

const DepartmentSchema = new SimpleSchema({
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
        type: String, // 何?
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
    customer: {
        type: String, // 顧客Id
    },
    name: { // アプローチ部署名
        type: String,
    },
    keyPersons: { // キーマン
        type: [Object],
        optional: true,
    },
    'keyPersons.$.name': { // キーマン名
        type: String,
        optional: true,
    },
    'keyPersons.$.familiality': { // キーマン親密度
        type: String,
        optional: true,
        //allowedValues: () => getFamilialityCategory(),
    },
    influencers: { // インフルエンサー
        type: [Object],
        optional: true,
    },
    'influencers.$.name': { // インフルエンサー名
        type: String,
        optional: true,
    },
    'influencers.$.familiality': { // インフル親密度
        type: String,
        optional: true,
    },
    contentionRatio: { // 競合率
        type: Number,
        optional: true,
        //allowedValues: () => getContentionRateCategory(),
    },
    growingExpectation: { // 拡販余地
        type: String,
        optional: true,
        //allowedValues: () => getGrowingExpectationCategory(),
    },
    // リピート
    repeatSales: { // リピート金額
        type: SimpleSchema.Integer,
        optional: true,
    },
    repeatGrossMargin: { // リピート粗利
        type: SimpleSchema.Integer,
        optional: true,
    },
    // 提案
    propositionSales: { // 提案売上金額
        type: SimpleSchema.Integer,
        optional: true,
    },
    propositionGrossMargin: { // 提案売上粗利
        type: SimpleSchema.Integer,
        optional: true,
    },
    numberOfSalesCases: { // 売上件数
        type: SimpleSchema.Integer,
        optional: true,
    },
    numberOfPropositionCases: { // 提案件数
        type: SimpleSchema.Integer,
        optional: true,
    },
    propositionUnitSales: { // 提案単価
        type: SimpleSchema.Integer,
        optional: true,
    },
});

Departments.attachSchema(DepartmentSchema);