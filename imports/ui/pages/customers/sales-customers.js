import { updateDepartment } from '/imports/api/customers/methods.js';
import { Template } from 'meteor/templating';

import './sales-customers.html';

Template.salesCustomers.events({
    'change .cell' (event) {
        event.preventDefault();

        const target = event.target;
        const departmentId = target.id;

        updateDepartment.call({
            departmentId,
            field: target.form.id,
            value: target.value,
        }), (error) => {
            if (error) {
                console.log('updateDepartment.call', error);
            }
        }
    }
});