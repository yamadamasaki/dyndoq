import { Template } from 'meteor/templating'
import { Visits } from '/imports/api/visits/visits.js'
import { Visitnotes } from '/imports/api/visitnotes/visitnotes.js'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Tracker } from 'meteor/tracker'
import { moment } from 'meteor/momentjs:moment'
import { toAppointed } from '/imports/api/visits/methods.js'
import { insertVisitnote } from '/imports/api/visitnotes/methods.js'

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
            Meteor.subscribe('visits.bygroup', u.tenant, groupName)
            Meteor.subscribe('visitnotes.bygroup', u.tenant, groupName)
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
    },
    'click .prenote-button' (event) {
        event.preventDefault()

        const [x, visitId] = event.target.id.split('-')
        const visit = Visits.findOne(visitId)
        if (!visit) return
        let visitnote = (Visitnotes.findOne({ visit: visitId }) || {})._id
        if (!visitnote) {
            visitnote = insertVisitnote.call({ visit: visitId, year: visit.financialYear, group: visit._group }, error => {
                if (error) {
                    console.log('insertVisitnote.call', error)
                }
            })
        }
        window.open(`${window.location.protocol}//${window.location.host}/visitnote/${visitnote}/pre`, '_blank')
    }
})