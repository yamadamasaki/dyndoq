import { Smaps } from '/imports/api/smaps/smaps.js';
import { check, Match } from 'meteor/check';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Customers } from '/imports/api/customers/customers.js'
import { Products } from '/imports/api/products/products.js'

import './smaps.html';

import './add-smap.js';
import './smaps-def.js';
import './smaps-show.js';
import './smaps-color-def.js';

Template.smaps.onCreated(() => {
    Tracker.autorun(() => {
        Meteor.subscribe('smaps.all');
    });
});

Template.smaps.helpers({
    yearIndex: () =>
        Smaps.find()
        .fetch()
        .map(x => x.financialYear)
        .sort((x, y) => y - x)
        .filter((x, i, self) => self.indexOf(x) === i), //unique()
    smapsArg: (year, elementType) => {
        check(year, Match.Integer);
        return { smaps: Smaps.find({ financialYear: year, elementType }), elementType, year };
    },
    smapsAllArg: year => {
        check(year, Match.Integer);
        return {
            customersSmaps: Smaps.find({ financialYear: year, elementType: 'customers' }),
            productsSmaps: Smaps.find({ financialYear: year, elementType: 'products' }),
        };
    },
    candpAllArg: year => {
        check(year, Match.Integer);
        return {
            customers: Customers.find({ financialYear: year }),
            products: Products.find({ financialYear: year }),
        };
    }
});