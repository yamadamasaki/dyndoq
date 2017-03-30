import { Meteor } from 'meteor/meteor'
import { Visits } from '../visits.js'

Meteor.publish('visits.all', function(tenant) {
    if (tenant) return Visits.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})

Meteor.publish('visits.bygroup', function(tenant, group) {
    if (tenant && group) return Visits.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group })
})