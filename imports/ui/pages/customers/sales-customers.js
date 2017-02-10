import { updateDepartment } from '/imports/api/customers/methods.js';
import { Template } from 'meteor/templating';

import './sales-customers.html';
import './persons-modal.js';

Template.salesCustomers.events({
    'change .cell' (event) {
        event.preventDefault();
        
        console.log('salesCustomers change .cell: ', event);

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
    },
    'click .keyPersons' (event, template) {
        event.preventDefault();

        console.log('click.keyPersons: ', event);

        template.$(`#personsModal-${event.currentTarget.id}`).modal();
    },
    'click .influencers' (event, template) {
        event.preventDefault();

        template.$(`#personsModal-${event.currentTarget.id}`).modal();
    },
});

Template.salesCustomers.helpers({
    departmentArgs: (department, target) => {
        console.log('departmentArgs: ', department, target);
        if (target === 'keyPersons') {
            console.log('.: ', target);
            return { department: department, persons: department.keyPersons, title: 'キーパーソン', kind: 'k' };
        } else if (target === 'influencers') {
            console.log('.: ', target);
            return { department: department, persons: department.influencers, title: 'インフルエンサー', kind: 'i' };
        }
    },
    persons: persons =>
        persons ?
        '<ul>' + persons.map(person => '<li>' + person.name + ' (' + (person.familiality || '?') + ')</li>') : '<p>-</p>',
});