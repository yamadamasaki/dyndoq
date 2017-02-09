import { Template } from 'meteor/templating';
import { insertDepartment } from '/imports/api/customers/methods.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

import './add-department.html';

Template.addDepartment.onCreated(function() {
    Meteor.subscribe('user.roles');
});

const ingroup = (group) => {
    if (!group) return "default-group";
    const roles = Meteor.users.findOne({ _id: Meteor.userId() }).roles;
    return (roles && roles[group]) ? group : null;
};

Template.addDepartment.events({
    'submit .add-department' (event) {
        event.preventDefault();

        const target = event.target;
        const name = target.name.value;
        const group = ingroup(FlowRouter.getQueryParam('group'));
        if (!group) {
            console.log("illeagal group: ", group);
            return;
        }
        const customerId = target.customerId.value;

        insertDepartment.call({ group, customerId, name }, (error) => {
            if (error) {
                console.log('insertDepartment.call', error);
            } else {
                target.name.value = '';
            }
        });
    },
});