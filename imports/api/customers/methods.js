import { Meteor } from 'meteor/meteor';
import { Customers } from './customers.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertCustomer = new ValidatedMethod({
    name: 'cutomers.insert',
    validate: new SimpleSchema({
        group: { type: String },
        year: { type: SimpleSchema.Integer },
        name: { type: String },
    }).validator(),
    run: ({ group, year, name }) => {
        return Customers.insert({
            _tenant: Meteor.users.findOne({ _id: Meteor.userId() }, { fields: { 'tenant': 1 } }).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            _owner: Meteor.userId(),
            _timestamp: new Date().getTime(),
            financialYear: parseInt(year),
            name: name,
        });
    },
});

export const updateCustomer = new ValidatedMethod({
    name: 'customer.update',
    validate: new SimpleSchema({
        customerId: { type: String },
        field: { type: String },
        value: { type: Number },
    }).validator(),
    run: ({ customerId, field, value }) => {
        Customers.update({ _id: customerId }, {
            $set: {
                [field]: value,
            }
        });
    },
});