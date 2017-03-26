import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';

Meteor.publish('products.all', function(tenant) {
    if (tenant) return Products.find({ _tenant: tenant, _service: 'sales-reinforcement' });
});

Meteor.publish('products.bygroup', function(tenant, group) {
    if (tenant && group) return Products.find({ _tenant: tenant, _service: 'sales-reinforcement', _group: group });
});