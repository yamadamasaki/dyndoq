import { Meteor } from 'meteor/meteor';
import { Products } from './products.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const insertProduct = new ValidatedMethod({
    name: 'products.insert',
    validate: new SimpleSchema({
        group: { type: String },
        year: { type: SimpleSchema.Integer },
        name: { type: String },
    }).validator(),
    run: ({ group, year, name }) => {
        return Products.insert({
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

export const updateProduct = new ValidatedMethod({
    name: 'products.update',
    validate: new SimpleSchema({
        productId: { type: String },
        field: { type: String },
        value: { type: Number },
    }).validator(),
    run: ({ productId, field, value }) => {
        Products.update({ _id: productId }, {
            $set: {
                [field]: value,
            }
        });
    },
});