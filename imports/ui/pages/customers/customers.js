import { Template } from 'meteor/templating';
import { Customers } from '/imports/api/customers/customers.js';
import { Departments } from '/imports/api/customers/departments.js';
import { check, Match } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { updateCustomer } from '/imports/api/customers/methods.js';

import './customers.html';
import './add-customer.js';
import './add-department.js';
import './accounting-customers.js';
import './sales-customers.js';

Template.customers.onCreated(() => {
    Tracker.autorun(() => {
        Meteor.subscribe('customers.all');
        Meteor.subscribe('departments.all');
    });
});

Template.customers.helpers({
    customerGrossMarginRate: (customer) => customer.grossMargin / customer.sales * 100,
    customerSalesVariableCost: (customer) => customer.salesVariableCost / customer.sales * 100,
    yearIndex: () =>
        Customers.find()
        .fetch()
        .map(x => x.financialYear)
        .sort((x, y) => y - x)
        .filter((x, i, self) => self.indexOf(x) === i), //unique()
    customers: (year) => {
        check(year, Match.Integer);
        return Customers.find({ financialYear: year });
    },
    customersArg: year => {
        check(year, Match.Integer);
        return { customers: Customers.find({ financialYear: year }) };
    },
    singleCustomerArg: customer => { return { customers: [customer] } },
    departmentsArg: customer => {
        check(customer, Object);
        return { departments: Departments.find({ customer: customer._id }) };
    },
    customerArg: customer => {
        check(customer, Object);
        return { customer };
    }
});

Template.customers.events({
    'change .cell' (event) {
        event.preventDefault();

        const target = event.target;
        const customerId = target.id;

        updateCustomer.call({
            customerId,
            field: target.form.id,
            value: parseInt(target.value)
        }), (error) => {
            if (error) {
                console.log('updateCustomer.call', error);
            }
        }
    }
});