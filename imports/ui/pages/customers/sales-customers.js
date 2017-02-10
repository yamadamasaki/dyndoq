import { updateDepartment } from '/imports/api/customers/methods.js';
import { Template } from 'meteor/templating';

import './sales-customers.html';
import './persons-modal.js';

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

Template.salesCustomers.events({
    'click .keyPersons' (event, template) {
        event.preventDefault();

        template.$('#personModal').modal();
    }
});

Template.salesCustomers.events({
    'click .influencer' (event, template) {
        event.preventDefault();

        template.$('#personModal').modal();
    }
});