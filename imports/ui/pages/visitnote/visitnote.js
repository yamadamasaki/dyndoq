import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { Visits } from '/imports/api/visits/visits.js'
import { Customers } from '/imports/api/customers/customers.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Visitnotes } from '/imports/api/visitnotes/visitnotes.js'

import './visitnote.html'

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
        }
    })
})

Template.visitnote.helpers({
    mode,
    visit: () => Visits.findOne(Visitnotes.findOne(id || {}).visit),
    departmentName: id => (Departments.findOne(id) || {}).name,
    customerName: departmentId => (Customers.findOne((Departments.findOne(departmentId) || {}).customer) || {}).name,
    note: () => Visitnotes.findOne(id)
})