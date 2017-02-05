import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './add-customer.html';

Template.customers.events({
    'submit .add-customer' (event) {
        event.preventDefault();

        const target = event.target;
        const year = target.year;
        const customer = target.customer;

        console.log('submit .customer-add-year:', year.value, customer.value);

        Meteor.call('customers.insert', year.value, customer.value, (error) => {
            if (error) {
                alert(error.error);
            } else {
                year.value = '';
                customer.value = '';
            }
        });
    },
});