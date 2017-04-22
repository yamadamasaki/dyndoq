import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { Visits } from '/imports/api/visits/visits.js'
import { Customers } from '/imports/api/customers/customers.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Visitnotes } from '/imports/api/visitnotes/visitnotes.js'
import { Members } from '/imports/api/members/members.js'
import { SalesStepsDefs } from '/imports/api/definitions/sales-steps-defs.js'
import { moment } from 'meteor/momentjs:moment'

import './visitnote.html'

import './visitnote-offering.js'
import './visitnote-attenders.js'
import './visitnote-goals.js'
import './visitnote-review.js'

let id, mode

Template.visitnote.onCreated(() => {
    id = FlowRouter.getParam('id')
    mode = FlowRouter.getParam('mode')
    Tracker.autorun(() => {
        const u = Meteor.user()
        if (u) {
            Meteor.subscribe('customers.all', u.tenant)
            Meteor.subscribe('departments.all', u.tenant)
            Meteor.subscribe('visits.all', u.tenant)
            Meteor.subscribe('visitnotes.all', u.tenant)
            Meteor.subscribe('members.all', u.tenant)
            Meteor.subscribe('salesstepsdefs.all', u.tenant)
        }
    })
})

Template.visitnote.helpers({
    mode,
    visit: () => {
        const n = Visitnotes.findOne(id)
        return n ? Visits.findOne(n.visit) : null
    },
    departmentName: id => (Departments.findOne(id) || {}).name,
    customerName: departmentId => (Customers.findOne((Departments.findOne(departmentId) || {}).customer) || {}).name,
    note: () => Visitnotes.findOne(id),
    date: format => {
        if (!format) format = "YYYY 年 MM 月 DD 日"
        const n = Visitnotes.findOne(id)
        const v = n ? Visits.findOne(n.visit) : null
        return v ? moment((v.executedDate || v.plannedDate || new Date())).locale('ja').format(format) : ""
    },
    pre: () => mode === 'pre' || mode === 'prepost',
    post: () => mode === 'post' || mode === 'prepost',
    stepdef: () => {
        const n = Visitnotes.findOne(id) || {}
        const v = Visits.findOne(n.visit) || {}
        const m = Members.findOne(v.member) || {}
        return SalesStepsDefs.findOne(m.salesStepsDef) || {}
    }
})