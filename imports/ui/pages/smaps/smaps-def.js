import { Template } from 'meteor/templating';
import { updateSmap } from '/imports/api/smaps/methods.js';

import './smaps-def.html';

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
});