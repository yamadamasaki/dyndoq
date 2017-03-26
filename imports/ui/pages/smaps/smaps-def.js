import { Template } from 'meteor/templating';
import { updateSmap } from '/imports/api/smaps/methods.js';
import { Customers } from '/imports/api/customers/customers.js';
import { Products } from '/imports/api/products/products.js';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router'

import './smaps-def.html';
import './smap-modal.js';


Template.smapsDef.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        const g = FlowRouter.getQueryParam('group')
        if (u && g) {
            Meteor.subscribe('customers.bygroup', u.tenant, g);
            Meteor.subscribe('products.bygroup', u.tenant, g);
        }
    });
});

Template.smapsDef.events({
    'change .cell' (event) {
        event.preventDefault();

        const target = event.target;

        updateSmap.call({
            smapId: target.id,
            field: target.form.id,
            value: target.value,
        }), (error) => {
            if (error) {
                console.log('updateSmap.call', error);
            }
        }
    },
    'click .set-customers' (event, template) {
        event.preventDefault();

        template.$(`#smapModal-${event.currentTarget.id}`).modal('show');
    },
    'click .set-products' (event, template) {
        event.preventDefault();

        template.$(`#smapModal-${event.currentTarget.id}`).modal('show');
    },
});

Template.smapsDef.helpers({
    isCustomer: elementType => elementType === 'customers',
    elementsArgs: (smap, kind) => {
        if (kind === 'customers') {
            const targets = Customers.find({ financialYear: smap.financialYear, _group: smap._group });
            return { targets, smap, kind };
        } else { // products
            const targets = Products.find({ financialYear: smap.financialYear, _group: smap._group });
            return { targets, smap, kind };
        }
    },
    elementName: (elementId, elementType) => {
        const collection = elementType === 'customers' ? Customers : Products;
        const element = collection.findOne(elementId);
        return element ? element.name : '';
    }
});