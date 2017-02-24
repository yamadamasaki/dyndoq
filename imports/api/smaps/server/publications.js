import { Meteor } from 'meteor/meteor';
import { Smaps } from '../smaps.js';
import { SmapColors } from '../smap-colors.js';
import { SmapsDetail } from '../smaps-detail.js';

// 本当は tenant などでフィルタリングすべき
Meteor.publish('smaps.all', function() {
    return Smaps.find();
});

Meteor.publish('smap-colors.all', function() {
    return SmapColors.find();
});

Meteor.publish('smaps-detail.all', function() {
    return SmapsDetail.find();
});