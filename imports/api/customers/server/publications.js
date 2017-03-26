import { Meteor } from 'meteor/meteor';
import { Customers } from '../customers.js';
import { Departments } from '../departments.js';

Meteor.publish('customers.all', function(tenant) {
    if (tenant) return Customers.find({ _tenant: tenant, _service: 'sales-reinforcement' });
});

Meteor.publish('customers.bygroup', function(tenant, group) {
    if (tenant && group) return Customers.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group });
});

Meteor.publish('departments.all', function(tenant) {
    if (tenant) return Departments.find({ _tenant: tenant, _service: 'sales-reinforcement' });
});

Meteor.publish('departments.bygroup', function(tenant, group) {
    if (tenant && group) return Departments.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group });
});