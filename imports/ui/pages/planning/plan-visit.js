import { Template } from 'meteor/templating'
import { Visits } from '/imports/api/visits/visits.js'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Tracker } from 'meteor/tracker'
import { moment } from 'meteor/momentjs:moment'
import { toAppointed } from '/imports/api/visits/methods.js'

import './plan-visit.html'

let groupName, memberId, year

Template.planVisit.onCreated(() => {
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

Template.planVisit.helpers({
    visits: (customer, step) => Visits.find({ department: customer, step, member: memberId, financialYear: year, }),
    formatDate: date => moment(date).locale('ja').format("MM/DD/YYYY")
})

Template.planVisit.events({
    'click .btn-primary' (event, template) {
        event.preventDefault()

        const [x, visitId] = event.target.id.split('-')
        template.$(`div[id=planVisitModal-${visitId}]`).modal('hide')
        const date = template.$(`input[id=datePicker-${visitId}]`)[0].value
        const plannedDate = new Date(date)
        const isAppointed = template.$(`input[id=appointmentCheckbox-${visitId}]`)[0].checked
        toAppointed.call({ _id: visitId, plannedDate, isAppointed }, error => {
            if (error) {
                console.log('toAppointed.call', error)
            }
        })
    }
})