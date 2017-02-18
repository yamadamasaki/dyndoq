import { Template } from 'meteor/templating';
import { ingroup } from '/imports/api/accounts/utilities.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { insertSmap } from '/imports/api/smaps/methods.js';

import './add-smap.html';

Template.addSmap.events({
    'submit .add-smap' (event) {
        event.preventDefault();

        const target = event.target;
        const [
            year,
            name,
            elementType,
            criteria,
            description
        ] = [
            target.year.value,
            target.name.value,
            target.elementType.value,
            target.criteria.value,
            target.description.value
        ];
        const group = ingroup(FlowRouter.getQueryParam('group'));
        if (!group) {
            console.log("illeagal group: ", group);
            return;
        }

        insertSmap.call({ group, year, name, elementType, description, criteria }, (error) => {
            if (error) {
                console.log('insertSmap.call', error);
            } else {
                target.criteria.value = target.description.value = target.year.value = target.name.value = '';
            }
        });
    },
});