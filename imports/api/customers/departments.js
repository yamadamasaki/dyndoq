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
    keyPersons: { // キーマン名
        type: Array,
        optional: true,
    },
    'keyPersons.$': {
        type: String,
    },
    keyPersonFamilialities: { // キーマン親密度
        type: Array,
        optional: true,
        //allowedValues: () => getFamilialityCategory(),
    },
    'keyPersonFamilialities.$': {
        type: String,
    },
    influencers: { // インフルエンサー名
        type: Array,
        optional: true,
    },
    'influencers.$': {
        type: String,
    },
    influencerFamilialities: { // インフル親密度
        type: Array,
        optional: true,
        //allowedValues: () => getFamilialityCategory(),
    },
    'influencerFamilialities.$': {
        type: String,
    },
    contentionRatio: { // 競合率
        type: String,
        optional: true,
        //allowedValues: () => getContentionRateCategory(),
    },
    growingExpectation: { // 拡販余地
        type: String,
        optional: true,
        //allowedValues: () => getGrowingExpectationCategory(),
    },
});

Departments.attachSchema(DepartmentSchema);