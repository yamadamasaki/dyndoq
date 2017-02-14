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
    numberOfSalesCases: { // 売上件数 -- 提案売り上げが立った件数と仮定する
        type: SimpleSchema.Integer,
        optional: true,
    },
    numberOfPropositionCases: { // 提案件数 -- 売上に至らなかったものも含んだ提案件数と仮定する
        type: SimpleSchema.Integer,
        optional: true,
    },
    /*
    propositionUnitSales: { // 提案単価 -- 提案売上/提案件数? 提案時の想定売上額の和/提案件数 (= 提案ごとの平均)?
        type: SimpleSchema.Integer,
        optional: true,
    },
    // 提案粗利率 -- 分子 = 提案粗利額?  分母 = 提案売上金額 or 提案時の想定売上額の和?
    // 提案粗利額 -- 提案売上粗利/提案件数? 提案時の想定売上粗利の和? 提案時の想定売上粗利の和/提案件数 (=提案後との平均) ?
    */
});

Departments.attachSchema(DepartmentSchema);
