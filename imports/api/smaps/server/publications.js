import { Meteor } from 'meteor/meteor';
import { Smaps } from '../smaps.js';

// 本当は tenant などでフィルタリングすべき
Meteor.publish('smaps.all', function() {
    return Smaps.find();
});