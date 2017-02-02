import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './body.html';

Template.App_body.helpers({
    userId: () => Meteor.userId(),
});