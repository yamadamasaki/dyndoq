import { Template } from 'meteor/templating';
import { updateSmap } from '/imports/api/smaps/methods.js';
import { Customers } from '/imports/api/customers/customers.js';
import { Products } from '/imports/api/products/products.js';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import './smaps-def.html';
import './smap-modal.js';


Template.smapsDef.onCreated(() => {
    Tracker.autorun(() => {
        Meteor.subscribe('customers.all');
        Meteor.subscribe('products.all');
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

        console.log('add-customer: ', event, event.currentTarget.id);
        template.$(`#smapModal-${event.currentTarget.id}`).modal('show');
    },
    'click .set-products' (event, template) {
        event.preventDefault();

        console.log('add-product: ', event, event.currentTarget.id);
        template.$(`#smapModal-${event.currentTarget.id}`).modal('show');
    },
});

Template.smapsDef.helpers({
    isCustomer: elementType => elementType === 'customers',
    elementsArgs: (smap, kind) => {
        console.log('elementsArgs: ', smap, kind);
        if (kind === 'customers') {
            const targets = Customers.find({ financialYear: smap.financialYear, _group: smap._group });
            console.log(".: ", targets.fetch());
            return { targets, smap, kind };
        } else { // products
            const targets = Products.find({ financialYear: smap.financialYear, _group: smap._group });
            console.log(".: ", targets.fetch());
            return { targets, smap, kind };
        }
    }
});