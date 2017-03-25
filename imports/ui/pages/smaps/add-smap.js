import { Template } from 'meteor/templating';
import { ingroup } from '/imports/api/accounts/utilities.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { insertSmap } from '/imports/api/smaps/methods.js';
import { Smaps } from '/imports/api/smaps/smaps.js';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';

import './add-smap.html';

Template.addSmap.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        if (u) Meteor.subscribe('smaps.all', u.tenant);
    });
});

Template.addSmap.events({
    'submit .add-smap' (event) {
        event.preventDefault();

        const target = event.target;
        const [
            year,
            elementType,
            criteria,
            description
        ] = [
            target.year.value,
            target.elementType.value,
            target.criteria.value,
            target.description.value
        ];
        const group = ingroup(FlowRouter.getQueryParam('group'));
        if (!group) {
            console.log("illeagal group: ", group);
            return;
        }
        const num = Smaps.find({ elementType, _group: group, financialYear: parseInt(year) }).count() + 1;
        const name = elementType === 'customers' ? `顧客区分${num}` : `製品区分${num}`;

        insertSmap.call({ group, year, name, elementType, description, criteria }, (error) => {
            if (error) {
                console.log('insertSmap.call', error);
                Bert.alert('戦略マップ区分を追加できませんでした', 'danger', 'growl-top-right');
            } else {
                target.criteria.value = target.description.value = target.year.value = target.name.value = '';
                Bert.alert('戦略マップ区分を追加しました', 'success', 'growl-top-right');
            }
        });
    },
});