import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Members } from '/imports/api/members/members.js'
import { Customers } from '/imports/api/customers/customers.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Visits } from '/imports/api/visits/visits.js'
import { lodash } from 'meteor/erasaur:meteor-lodash'
import { $ } from 'meteor/jquery'

import './fill-visits.js'
import './set-visit.js'

import './planning.html'

const _ = lodash

let groupName, memberId, year

Template.planning.onCreated(() => {
    groupName = FlowRouter.getParam('group')
    memberId = FlowRouter.getParam('member')
    year = parseInt(FlowRouter.getParam('year'))
    Tracker.autorun(() => {
        console.log("autorun onCreated")
        const u = Meteor.user()
        if (u && groupName) {
            Meteor.subscribe('members.bygroup', u.tenant, groupName)
            Meteor.subscribe('customers.bygroup', u.tenant, groupName)
            Meteor.subscribe('departments.bygroup', u.tenant, groupName)
            Meteor.subscribe('visits.bygroup', u.tenant, groupName)
        }
    })
})

const memberName = () => (Meteor.users.findOne((Members.findOne(memberId) || {}).account) || {}).username

const steps = () => (Object.keys(((Members.findOne(memberId) || {}).steps || {})) || {}).filter(it => it !== '受注')

const customers = () => (Members.findOne(memberId) || {}).inChargeOf

Template.planning.helpers({
    months: () => [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
    steps,
    customers,
    dname: departmentId => (Departments.findOne(departmentId) || {}).name,
    cname: departmentId => (Customers.findOne((Departments.findOne(departmentId) || {}).customer) || {}).name,
    financialYear: () => year,
    groupName: () => groupName,
    memberId: () => memberId,
    memberName,
    fillVisitsArgs: () => { return { year, memberName, memberId } },
    visits: month => Visits.find({ member: memberId, financialYear: year, month, $or: [{ plannedDate: { $exists: false } }, { plannedDate: { $eq: null } }] }),
    visitsGroup: month => {
        return _.flatten(['最重要', '重要', 'その他', '新規'].map(grade => {
            return steps().map(step => {
                return {
                    grade,
                    step,
                    n: Visits.find({
                        member: memberId,
                        financialYear: year,
                        month,
                        $or: [{ plannedDate: { $exists: false } }, { plannedDate: { $eq: null } }],
                        customerGrade: grade,
                        step,
                    }).count(),
                }
            })
        })).filter(it => it.n > 0)
    },
    visits: (customer, step) => Visits.find({ department: customer, step, member: memberId, financialYear: year, }),
})