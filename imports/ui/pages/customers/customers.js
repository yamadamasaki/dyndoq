import { Template } from 'meteor/templating';
import { Customers } from '/imports/api/customers/customers.js';
import { Departments } from '/imports/api/customers/departments.js';
import { check, Match } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'

import './customers.html';
import './add-customer.js';
import './add-department.js';
import './accounting-customers.js';
import './sales-customers.js';

Template.customers.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        const g = FlowRouter.getQueryParam('group')
        if (u && g) {
            Meteor.subscribe('customers.bygroup', u.tenant, g);
            Meteor.subscribe('departments.bygroup', u.tenant, g);
        }
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
    singleCustomerArg: customer => {
        check(customer, Object);
        return { customers: [customer] }
    },
    departmentsArg: customer => {
        check(customer, Object);
        return { departments: Departments.find({ customer: customer._id }) };
    },
    customerArg: customer => {
        check(customer, Object);
        return { customer };
    },
    trimAll: string => string.replace(/ /g, ""),
});