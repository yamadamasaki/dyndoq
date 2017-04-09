import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Departments } from '/imports/api/customers/departments.js'
import { Customers } from '/imports/api/customers/customers.js'
import { Visits } from '/imports/api/visits/visits.js'
import { Members } from '/imports/api/members/members.js'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { toAppeared } from '/imports/api/visits/methods.js'

import './set-visit.html'

let groupName, memberId, year

Template.setVisit.onCreated(() => {
    Tracker.autorun(() => {
        groupName = FlowRouter.getParam('group')
        memberId = FlowRouter.getParam('member')
        year = parseInt(FlowRouter.getParam('year'))
        const u = Meteor.user()
        if (u && groupName) {
            Meteor.subscribe('members.bygroup', u.tenant, groupName)
            Meteor.subscribe('customers.bygroup', u.tenant, groupName)
            Meteor.subscribe('departments.bygroup', u.tenant, groupName)
            Meteor.subscribe('visits.bygroup', u.tenant, groupName)
        }
    })
})

Template.setVisit.helpers({
    customers: grade =>
        ((Members.findOne(memberId) || {}).inChargeOf || {})
        .map(departmentId => Departments.findOne(departmentId))
        .filter(department => department && department.grade === grade)
        .map(department => {
            const customer = Customers.findOne(department.customer)
            if (!customer) return null
            return { cname: customer.name, dname: department.name, did: department._id }
        }),
})

Template.setVisit.onRendered(() => {
    console.log("onRendered: ")
    this.$("input[id^=datePicker-]").datepicker({ language: 'ja' })
})

Template.setVisit.events({
    'click .btn-primary' (event, template) {
        event.preventDefault()

        const [x, month, grade, step] = event.target.id.split('-')
        const postfix = `${month}-${grade}-${step}`
        const dest = template.$("select[id=customerSelector-" + postfix + "]")[0].value
        const date = template.$("input[id=datePicker-" + postfix + "]")[0].value
        template.$("div[id=setVisitModal-" + postfix + "]").modal('hide')
        const plannedDate = new Date(date)
        const [cname, dname] = dest.split("/")
        const customer = Customers.findOne({ name: cname })
        const department = (Departments.findOne({ name: dname, customer: customer._id }) || {})._id
        if (!department) { console.log("customer not found"); return }
        const visit = (findUnappearedVisit(parseInt(month), grade, step) || {})._id
        if (!visit) { console.log("no visits to appear"); return }
        toAppeared.call({ _id: visit, plannedDate, department }, error => {
            if (error) {
                console.log('toAppeared.call', error)
            }
        })
    },
})

const findUnappearedVisit = (month, customerGrade, step) =>
    Visits.findOne({ month, customerGrade, step, $or: [{ department: { $exists: false }, department: null }] }, { _id: 1 })