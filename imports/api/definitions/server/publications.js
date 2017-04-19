import { Meteor } from 'meteor/meteor'
import { SalesStepsDefs } from '../sales-steps-defs.js'

Meteor.publish('salesstepsdefs.all', function(tenant) {
    if (tenant) return SalesStepsDefs.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})