import { Meteor } from 'meteor/meteor';
import { Customers } from './customers.js';

import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
//import { tenant, group, service } from '/imports/api/accounts/server/utilities.js';

export const insertCustomer = new ValidatedMethod({
    name: 'cutomers.insert',
    validate: new SimpleSchema({
        year: { type: SimpleSchema.Integer },
        name: { type: String }
    }).validator(),
    run: ({ year, name }) => {
        return Customers.insert({
            _tenant: "tenant-a", //tenant(),
            _service: "sales-reinforcement", //service(),
            _group: "default-group", //group(),
            _owner: Meteor.userId(),
            _timestamp: new Date().getTime(),
            financialYear: parseInt(year),
            name: name,
        });
    },
});