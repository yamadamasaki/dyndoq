import { Meteor } from 'meteor/meteor'
import { Members } from '../members.js'

Meteor.publish('members.all', function(tenant) {
    if (tenant) return Members.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})

Meteor.publish('members.bygroup', function(tenant, group) {
    if (tenant && group) return Members.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group })
})