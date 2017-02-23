import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { _ } from 'meteor/underscore';
import { Smaps } from '/imports/api/smaps/smaps.js';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { addToSmap } from '/imports/api/smaps/methods.js';

import './smap-modal.html';

Template.smapModal.onCreated(() => {
    Tracker.autorun(() => {
        Meteor.subscribe('smaps.all');
    });
});

Template.smapModal.events({
    'submit .smap-customers': event => {
        event.preventDefault();

        const target = event.target;
        const modal = target.id.replace('smapForm', 'smapModal');
        const smapId = target.id.split('-')[1];

        let elements = [];
        _.range(target.length).forEach((e, i) => {
            if (target[i].type === 'checkbox') {
                if (target[i].checked) {
                    const element = target[i].name.split('-')[1];
                    elements.push(element);
                }
            }
        });

        addToSmap.call({ smapId, elements }), (error) => {
            if (error) {
                console.log('addToSmap.call', error);
            }
        }

        $('#' + modal).modal('hide');
    },
    'submit .smap-products': event => {
        event.preventDefault();

        console.log("submit .smap-products : ", event);

        $('#smapModal').modal('hide');
    },
});

Template.smapModal.helpers({
    isMember: (smapId, targetId) => {
        const smap = Smaps.findOne(smapId);
        return smap && smap.elements && smap.elements.indexOf(targetId) !== -1
    },
});