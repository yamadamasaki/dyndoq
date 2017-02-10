import { Template } from 'meteor/templating';
import { addPersonToDepartment } from '/imports/api/customers/methods.js';

import './persons-modal.html';

Template.personsModal.events({
    'click .add-person' (event) {
        event.preventDefault();
        event.stopPropagation(); // 上位の .keyPerson まで波及しないようにする

        console.log('personModal click .add-person: ', event);

        const targetId = event.currentTarget.id;
        if (!targetId) return;
        const [departmentId, kind] = targetId.split('-');

        console.log('.: ', departmentId, kind);

        addPersonToDepartment.call({
            departmentId,
            field: kind === 'k' ? 'keyPersons' : 'influencers',
            person: { name: "", familiality: "" },
        }, (error) => {
            if (error) {
                console.log('addPersonToDepartment.call', error);
            }
        });
    },
    'change .cell' (event) {
        event.preventDefault();
        event.stopPropagation(); // 上位の .keyPerson まで波及しないようにする

        console.log('personModal change .cell: ', event);

        const target = event.target;
        const name = target.name.value;
        const familiality = target.familiality.value;

        if (!name && !familiality) {
            console.log("personsModal change .cell: ", 'empty name and familiality');
            return;
        }

        const targetId = target.id;
        if (!targetId) return;
        const [departmentId, kind] = targetId.split('-');

        console.log('.: ', departmentId, kind);

        addPersonToDepartment.call({
            departmentId,
            field: kind === 'k' ? 'keyPersons' : 'influencers',
            person: { name, familiality },
        }, (error) => {
            if (error) {
                console.log('addPersonToDepartment.call', error);
            }
        });
    },
});