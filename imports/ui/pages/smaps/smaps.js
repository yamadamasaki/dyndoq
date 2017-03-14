import { Smaps } from '/imports/api/smaps/smaps.js';
import { check, Match } from 'meteor/check';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

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
    smapsShowArg: (year, metric) => {
        return {
            customersSmaps: Smaps.find({ financialYear: year, elementType: 'customers' }),
            productsSmaps: Smaps.find({ financialYear: year, elementType: 'products' }),
            metric: metric,
        }
    },
    metrics: () => {
        return [
            { title: '粗利益額', name: 'grossMargin', },
            { title: '粗利益率', name: 'grossMarginRate', },
            { title: '売上額', name: 'sales', },
            { title: '変動費', name: 'variableCost', },
            { title: '変動費率', name: 'variableCostRate', },
            { title: '限界利益額', name: 'marginalProfit', },
            { title: '限界利益率', name: 'marginalProfitRate', },
            { title: '在庫', name: 'stock', },
        ];
    },
    trimAll: string => string.replace(/ /g, ""),
});