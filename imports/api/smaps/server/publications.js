import { Meteor } from 'meteor/meteor';
import { Smaps } from '../smaps.js';
import { SmapColors } from '../smap-colors.js';
import { SmapsDetail } from '../smaps-detail.js';

Meteor.publish('smaps.all', function(tenant) {
    return Smaps.find({ _tenant: tenant });
});

Meteor.publish('smap-colors.all', function(tenant) {
    return SmapColors.find({ _tenant: tenant });
});

Meteor.publish('smaps-detail.all', function(tenant) {
    return SmapsDetail.find({ _tenant: tenant });
});