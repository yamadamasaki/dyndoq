import { Template } from 'meteor/templating';
import { updatePerson, insertPerson } from '/imports/api/customers/methods.js';

import './persons-modal.html';

Template.personsModal.helpers({
    index: persons =>
        persons ? Array(persons.length).fill(1).map((v, i) => i) : [],
    nth: (persons, i) => persons[i],
});

Template.personsModal.events({
    'click .add-person' (event) {
        event.preventDefault();
        event.stopPropagation(); // 上位の .keyPerson まで波及しないようにする

        const targetId = event.currentTarget.id;
        if (!targetId) return;
        const [departmentId, kind] = targetId.split('-');

        insertPerson.call({
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

        const target = event.target;
        const value = target.value;
        const subfield = target.name;

        const targetId = target.id;
        if (!targetId) return;
        const [departmentId, kind, i] = targetId.split('-');

        updatePerson.call({
            departmentId,
            field: kind === 'k' ? 'keyPersons' : 'influencers',
            subfield,
            value,
            i: parseInt(i),
        }, (error) => {
            if (error) {
                console.log('addPersonToDepartment.call', error);
            }
        });
    },
});