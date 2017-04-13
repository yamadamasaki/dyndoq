import { Meteor } from 'meteor/meteor'
import { Visitnotes } from '../visitnotes.js'

Meteor.publish('visitnotes.all', function(tenant) {
    if (tenant) return Visitnotes.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})

Meteor.publish('visitnotes.bygroup', function(tenant, group) {
    if (tenant && group) return Visitnotes.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group })
})