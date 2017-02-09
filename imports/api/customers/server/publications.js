import { Meteor } from 'meteor/meteor';
import { Customers } from '../customers.js';
import { Departments } from '../departments.js';

// 本当は tenant などでフィルタリングすべき
Meteor.publish('customers.all', function() {
    return Customers.find();
});

// 本当は tenant などでフィルタリングすべき
Meteor.publish('departments.all', function() {
    return Departments.find();
});