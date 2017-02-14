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
    },
    'click .keyPersons' (event, template) {
        event.preventDefault();

        template.$(`#personsModal-${event.currentTarget.id}`).modal();
    },
    'click .influencers' (event, template) {
        event.preventDefault();

        template.$(`#personsModal-${event.currentTarget.id}`).modal();
    },
});

Template.salesCustomers.helpers({
    departmentArgs: (department, target) => {
        if (target === 'keyPersons') {
            return { department: department, persons: department.keyPersons, title: 'キーパーソン', kind: 'k' };
        } else if (target === 'influencers') {
            return { department: department, persons: department.influencers, title: 'インフルエンサー', kind: 'i' };
        }
    },
    persons: persons => {
        if (!persons) return '<p>-</p>';
        let s = '<ul>';
        persons.forEach(p => { s = s + '<li>' + p.name + ' (' + (p.familiality || '?') + ')</li>' });
        s = s + '</ul>'
        return s;
    },
    repeatGrossMarginRatio: department => department.repeatGrossMargin / department.repeatSales,
    propositionGrossMarginRatio: department => department.propositionGrossMargin / department.propositionSales,
    propositionToSalesRatio: department => department.numberOfSalesCases / department.numberOfPropositionCases,
});