import { Template } from 'meteor/templating';
import { insertCustomer } from '/imports/api/customers/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';

import './add-customer.html';

Template.customers.events({
    'submit .add-customer' (event) {
        event.preventDefault();

        const target = event.target;
        const [year, name] = [target.year.value, target.name.value];

        insertCustomer.call({ year, name }, (err, res) => {
            if (err) {
                console.log('insertCustomer.call', err);
                FlowRouter.go('App.home');
            } else {
                target.year.value = target.name.value = '';
                FlowRouter.go('customers', {}, {
                    group: FlowRouter.getQueryParam('group'),
                    year: FlowRouter.getQueryParam('year')
                });
            }
        });
    },
});