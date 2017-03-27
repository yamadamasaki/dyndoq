import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Members } from '/imports/api/members/members.js'
import { Customers } from '/imports/api/customers/customers.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'

import './planning.html'

let groupname, memberid, year

Template.planning.onCreated(() => {
    groupname = FlowRouter.getParam('group')
    memberid = FlowRouter.getParam('member')
    year = parseInt(FlowRouter.getParam('year'))
    Tracker.autorun(() => {
        const u = Meteor.user()
        if (u && groupname) {
            Meteor.subscribe('members.bygroup', u.tenant, groupname)
            Meteor.subscribe('customers.bygroup', u.tenant, groupname)
            Meteor.subscribe('departments.bygroup', u.tenant, groupname)
        }
    })
})

Template.planning.helpers({
    items: function() {
        return [{ name: 'Item0', number: 0 }, { name: 'Item1', number: 1 }, { name: 'Item2', number: 2 }, { name: 'Item3', number: 3 }, { name: 'Item4', number: 4 }, { name: 'Item5', number: 5 }, ]
    },
    months: () => [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
    steps: () => Object.keys((Members.findOne({ _id: memberid, financialYear: year }) || {}).steps || {}),
    customers: () => (Members.findOne({ _id: memberid, financialYear: year }) || {}).inChargeOf,
    dname: departmentId => (Departments.findOne(departmentId) || {}).name,
    cname: departmentId => (Customers.findOne((Departments.findOne(departmentId) || {}).customer) || {}).name,
})

Template.planning.onRendered(function() {
    dragula([document.getElementById('left1'), document.getElementById('right1')])
})