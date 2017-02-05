import { Meteor } from 'meteor/meteor';

import links from './fixtures-links.js';

Meteor.startup(() => {
    links();
});