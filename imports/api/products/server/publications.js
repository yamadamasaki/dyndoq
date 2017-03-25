import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';

Meteor.publish('products.all', function(tenant) {
    return Products.find({ _tenant: tenant });
});