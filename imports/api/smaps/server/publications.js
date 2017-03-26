import { Meteor } from 'meteor/meteor'
import { Smaps } from '../smaps.js'
import { SmapColors } from '../smap-colors.js'
import { SmapsDetail } from '../smaps-detail.js'

Meteor.publish('smaps.all', function(tenant) {
    if (tenant) return Smaps.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})

Meteor.publish('smaps.bygroup', function(tenant, group) {
    if (tenant && group) return Smaps.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group })
})

Meteor.publish('smap-colors.all', function(tenant) {
    if (tenant) return SmapColors.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})

Meteor.publish('smap-colors.bygroup', function(tenant, group) {
    if (tenant && group) return SmapColors.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group })
})

Meteor.publish('smaps-detail.all', function(tenant) {
    if (tenant) return SmapsDetail.find({ _tenant: tenant, _service: 'sales-reinforcement' })
})

Meteor.publish('smaps-detail.bygroup', function(tenant, group) {
    if (tenant && group) return SmapsDetail.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group })
})