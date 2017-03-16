import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const Members = new Mongo.Collection('members');

const MemberSchema = new SimpleSchema({
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
    account: {
        type: String, // userId
        optional: true,
    },
    financialYear: {
        type: SimpleSchema.Integer,
    },
    workingHoursPerDay: { // 一日稼働時間
        type: SimpleSchema.Integer,
        optional: true,
    },
    workingDaysPerMonth: { // 月稼働日数
        type: SimpleSchema.Integer,
        optional: true,
    },
    activityTypes: { // 活動名称とその比率% (e.g. { 訪問:35, 移動: 30, ... }), '訪問'は必須
        type: Object,
        optional: true,
    },
    hoursPerVisiting: { // 訪問当たり時間
        type: Number,
        decimal: true,
        optional: true,
    },
    currentCustomerPercentile: { // 既存顧客比率 (対新規顧客)
        type: Number,
        decimal: true,
        optional: true,
    },
    mostSignificantCustomerPercentile: { // 最重要顧客比率 (既存顧客中)
        type: Number,
        decimal: true,
        optional: true,
    },
    significantCustomerPercentile: { // 重要顧客比率 (既存顧客中)
        type: Number,
        decimal: true,
        optional: true,
    },
    steps: { // ステップ名称と前のステップからの転換率 (e.g. { アプローチ: 100, ..., 受注: 17}), '受注'は必須
        // 順序は保存されるか? キーが文字列ならばおおよそ保存されるようだ (Javascript 処理系依存)
        type: Object,
        optional: true,
    },
    salesGoalOfPropositionSalesPerMonth: { // 提案売上月次目標 (売上)
        type: Number,
        decimal: true,
        optional: true,
    },
    grossMarginGoalOfPropositionSalesPerMonth: { // 提案売上月次目標 (粗利額)
        type: Number,
        decimal: true,
        optional: true,
    },
    inChargeOf: { // 担当顧客部署
        type: [String], // DepartmentId
        optional: true,
    }
});

Members.attachSchema(MemberSchema);