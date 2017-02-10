import { Meteor } from 'meteor/meteor';
import { Customers } from './customers.js';
import { Departments } from './departments.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check, Match } from 'meteor/check';

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
    name: 'customers.update',
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

export const insertDepartment = new ValidatedMethod({
    name: 'deparments.insert',
    validate: new SimpleSchema({
        group: { type: String },
        customerId: { type: String },
        name: { type: String },
    }).validator(),
    run: ({ group, customerId, name }) => {
        const customer = Customers.findOne({ _id: customerId }, { fields: { financialYear: 1 } });
        if (!customer) {
            console.log("insertDepartment: customer does not exists", customerId);
            return;
        }
        return Departments.insert({
            _tenant: Meteor.users.findOne({ _id: Meteor.userId() }, { fields: { 'tenant': 1 } }).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            _owner: Meteor.userId(),
            _timestamp: new Date().getTime(),
            financialYear: customer.financialYear,
            customer: customerId,
            name: name,
        });
    },
});

export const updateDepartment = new ValidatedMethod({
    name: 'departments.update',
    // value の型は field に依存し, 既に caller 側で型が合わせられている前提なので, ここではチェックしない
    validate: args => {
        check(args, {
            departmentId: String,
            field: String,
            value: Match.Any,
        });
    },
    run: ({ departmentId, field, value }) => {
        Departments.update({ _id: departmentId }, {
            $set: {
                [field]: value,
            }
        });
    },
});

export const addPersonToDepartment = new ValidatedMethod({
    name: 'departments.person.push',
    validate: args => {
        check(args, {
            departmentId: String,
            field: String,
            person: {
                name: String,
                familiality: String,
            }
        })
    },
    run: ({ departmentId, field, person }) => {
        console.log('addPersonToDepartment: ', departmentId, field, person);
        Departments.update({ _id: departmentId }, {
            $push: {
                [field]: person,
            }
        });
    },
});