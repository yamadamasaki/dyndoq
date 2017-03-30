import { Template } from 'meteor/templating'
import { Members } from '/imports/api/members/members.js'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { lodash } from 'meteor/erasaur:meteor-lodash'
import { removeVisits, insertVisit } from '/imports/api/visits/methods.js'
import { Bert } from 'meteor/themeteorchef:bert'

import './fill-visits.html'

const _ = lodash

Template.fillVisits.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        const g = FlowRouter.getParam('group')
        if (u && g) Meteor.subscribe('members.bygroup', u.tenant, g)
    })
})

Template.fillVisits.events({
    'submit .fill-visits' (event) {
        event.preventDefault()

        const target = event.target
        const [year, member] = [target.year.value, target.memberId.value]
        const group = FlowRouter.getParam('group')

        removeVisits.call({ group, year, member }, (error) => {
            if (error) {
                console.log('removeVisits.call', error)
                Bert.alert('訪問を削除できませんでした', 'danger', 'growl-top-right')
            } else {
                Bert.alert('訪問を削除しました', 'success', 'growl-top-right')
            }
        })

        const m = Members.findOne(member)
        if (!m) return

        const visitsNumbers = getVisitsNumbers(m)

        _.toPairs(visitsNumbers).forEach(it => { // 顧客区分ごとに
            const [grade, steps] = it
            _.times(12, (month) => { // 毎月
                _.toPairs(steps).forEach(step => { // ステップごとに
                    const [stepName, n] = step
                    _.times(n, () => { // n 回の
                        insertVisit.call({ group, year, member, month: month + 1, stepName, grade }, (error) => {
                            if (error) {
                                console.log("insertVisit.call", error)
                            }
                        })
                    })
                })
            })
        })
        Bert.alert('訪問を追加しました', 'success', 'growl-top-right')
    },
})

const getVisitsNumbers = (m) => {
    // VPM = VisitsPerMonth
    const nVPM =
        (m.workingHoursPerDay * m.workingDaysPerMonth) *
        ((m.activityTypes || {}).訪問 / 100) /
        m.hoursPerVisiting

    // CC = CurrentCustomer
    // MSC = MostSignificantCustomer
    // SC = SignificantCustomer
    // OC = OrdinaryCustomer
    // NC = NewCustomer

    // 全ステップの訪問数をステップごとに割り振る
    const VPMByStep = (n, step) => n * step.conversionRatio / 100 * step.standardVisitFrequency

    // グレードごとの全ステップ訪問数
    const VPMByGrade = (grade) => {
        let v = 0
        switch (grade) {
            case '最重要':
                v = m.mostSignificantCustomerPercentile || 0
                break;
            case '重要':
                v = m.significantCustomerPercentile || 0
                break;
            case 'その他':
                v = 100 - (m.mostSignificantCustomerPercentile || 0) - (m.significantCustomerPercentile || 0)
                break;
        }
        return v / 100 * m.currentCustomerPercentile / 100 * nVPM
    }

    // 正規化係数
    const nNC = _.values(m.steps).reduce((acc, val) => acc += val.conversionRatio / 100 * val.standardVisitFrequency, 0)

    // グレードごとに各ステップの訪問数が決まる
    const VPMsByGrade = (grade) => _.mapValues(m.steps, step => VPMByStep(VPMByGrade(grade) / nNC, step))

    const nMSC_VPMs = VPMsByGrade('最重要')

    const nSC_VPMs = VPMsByGrade('重要')

    const nOC_VPMs = VPMsByGrade('その他')

    const nNC_VPM = nVPM * (100 - m.currentCustomerPercentile) / 100

    const nNC_VPMs = _.mapValues(m.steps, step => VPMByStep(nNC_VPM / nNC, step))

    return { 最重要: nMSC_VPMs, 重要: nSC_VPMs, その他: nOC_VPMs, 新規: nNC_VPMs }
}