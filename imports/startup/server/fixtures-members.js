import { Members } from '../../api/members/members.js'
import { Meteor } from 'meteor/meteor'
import { Departments } from '../../api/customers/departments.js'

export default () => {
    // if the Members collection is empty
    if (Members.find().count() === 0) {
        const account = Meteor.users.findOne({})
        Members.insert({
            _tenant: 'tenant-a',
            _service: 'sales-reinforcement',
            _timestamp: new Date().getTime(),
            financialYear: 2016,
            account: account._id,
            workingHoursPerDay: 9,
            workingDaysPerMonth: 22,
            activityTypes: { 訪問: 35, 移動: 30, 企画書作成: 25, 社内会議ほか: 10 },
            hoursPerVisiting: 0.5,
            currentCustomerPercentile: 80,
            mostSignificantCustomerPercentile: 60,
            significantCustomerPercentile: 30,
            steps: {
                アプローチ: { conversionRatio: 100, standardVisitFrequency: 1, },
                ヒアリング: { conversionRatio: 100, standardVisitFrequency: 2, },
                プレゼンテーション: { conversionRatio: 50, standardVisitFrequency: 4, },
                クロージング: { conversionRatio: 25, standardVisitFrequency: 2 },
                受注: { conversionRatio: 17, standardVisitFrequency: 0, },
            },
            salesGoalOfPropositionSalesPerMonth: 4800000,
            grossMarginGoalOfPropositionSalesPerMonth: 1440000,
        })
    }
}