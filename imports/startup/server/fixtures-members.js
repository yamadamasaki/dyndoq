import { Members } from '../../api/members/members.js';
import { Meteor } from 'meteor/meteor';

export default () => {
    // if the Members collection is empty
    if (Members.find().count() === 0) {
        Members.insert({
            _tenant: 'tenant-a',
            _service: 'sales-reinforcement',
            _timestamp: new Date().getTime(),
            financialYear: 2016,
            account: Meteor.users.findOne({})._id,
            workingHoursPerDay: 9,
            workingDaysPerMonth: 22,
            activityTypes: { 訪問: 35, 移動: 30, 企画書作成: 25, 社内会議ほか: 10 },
            hoursPerVisiting: 0.5,
            currentCustomerPercentile: 80,
            mostSignificantCustomerPercentile: 60,
            significantCustomerPercentile: 30,
            steps: { アプローチ: 100, ヒアリング: 100, プレゼンテーション: 50, クロージング: 25, 受注: 17 },
            salesGoalOfPropositionSalesPerMonth: 4800000,
            grossMarginGoalOfPropositionSalesPerMonth: 1440000,
        });
    }
}