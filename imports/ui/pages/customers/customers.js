import { Template } from 'meteor/templating';
import { Customers } from '/imports/api/customers/customers.js';
import { check, Match } from 'meteor/check';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import './customers.html';

Template.customers.onCreated(() => {
    Tracker.autorun(() => {
        Meteor.subscribe('customers.all');
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
});