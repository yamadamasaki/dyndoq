import { Template } from 'meteor/templating';
import { Products } from '/imports/api/products/products.js';
import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import './products.html';

import './add-product.js';
import './products-summary.js';

Template.products.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        if (u) Meteor.subscribe('products.all', u.tenant);
    });
});

Template.products.helpers({
    yearIndex: () =>
        Products.find()
        .fetch()
        .map(x => x.financialYear)
        .sort((x, y) => y - x)
        .filter((x, i, self) => self.indexOf(x) === i), //unique()
    products: year => {
        check(year, Match.Integer);
        return Products.find({ financialYear: year });
    },
    productsArg: year => {
        check(year, Match.Integer);
        return { products: Products.find({ financialYear: year }) };
    },
    trimAll: string => string.replace(/ /g, ""),
});