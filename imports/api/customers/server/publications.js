import { Meteor } from 'meteor/meteor';
import { Customers } from '../customers.js';
import { Departments } from '../departments.js';

Meteor.publish('customers.all', function(tenant) {
    return Customers.find({ _tenant: tenant });
});

Meteor.publish('departments.all', function(tenant) {
    return Departments.find({ _tenant: tenant });
});