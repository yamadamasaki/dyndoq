import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Smaps } from '/imports/api/smaps/smaps.js';

export const insertSmap = new ValidatedMethod({
    name: 'smaps.insert',
    validate: new SimpleSchema({
        group: { type: String },
        year: { type: SimpleSchema.Integer },
        name: { type: String },
        elementType: { type: String },
        criteria: { type: String },
        description: { type: String },
    }).validator(),
    run: ({ group, year, name, elementType, description, criteria }) => {
        return Smaps.insert({
            _tenant: Meteor.users.findOne({ _id: Meteor.userId() }, { fields: { 'tenant': 1 } }).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            _owner: Meteor.userId(),
            _timestamp: new Date().getTime(),
            financialYear: parseInt(year),
            name,
            elementType,
            criteria,
            description,
        });
    },
});