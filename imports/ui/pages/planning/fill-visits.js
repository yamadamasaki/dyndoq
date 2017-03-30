import { Template } from 'meteor/templating'
import { Members } from '/imports/api/members/members.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { lodash } from 'meteor/erasaur:meteor-lodash'

import './fill-visits.html'

const _ = lodash

Template.fillVisits.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        const g = FlowRouter.getQueryParam('group')
        if (u && g) Meteor.subscribe('members.bygroup', u.tenant, g)
    })
})

Template.fillVisits.events({
    'submit .fill-visits' (event) {
        event.preventDefault()

        const target = event.target
        const [year, memberName, memberId] = [target.year.value, target.memberName.value, target.memberId.value]

        //console.log("fillVisits: ", year, memberName, memberId)

        const m = Members.findOne(memberId)
        if (!m) return

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
        // const nCC_VPM = nVPM * m.currentCustomerPercentile / 100

        // 顧客数に応じて, (ステップごとの) 訪問数が決まる
        const VPMByStep = (n, step) => n * step.conversionRatio / 100 * step.standardVisitFrequency

        // グレードごとに, (各ステップの) 訪問数が決まる
        const VPMsByGrade = (grade) => {
            return _.mapValues(m.steps, step => {
                const c = (m.inChargeOf || {}).filter(it => (Departments.findOne(it) || {}).grade === grade)
                return c ? VPMByStep(c.length, step) : 0
            })
        }

        const nMSC_VPMs = VPMsByGrade('最重要')

        const nSC_VPMs = VPMsByGrade('重要')

        const nOC_VPMs = VPMsByGrade('その他')

        const nNC_VPM = nVPM * (100 - m.currentCustomerPercentile) / 100

        const nNC = _.values(m.steps).reduce((acc, val) => acc += val.conversionRatio / 100 * val.standardVisitFrequency, 0)

        const nNC_VPMs = _.mapValues(m.steps, step => VPMByStep(nNC_VPM / nNC, step))
    },
})