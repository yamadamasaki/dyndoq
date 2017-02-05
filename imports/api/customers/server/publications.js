import { Meteor } from 'meteor/meteor';
import { Customers } from '../customers.js';

Meteor.publish('customers.all', function() {
    return Customers.find();
});