import { Meteor } from 'meteor/meteor';

export const ingroup = (group) => {
    if (!group) return "default-group";
    const roles = Meteor.users.findOne({ _id: Meteor.userId() }).roles;
    return (roles && roles[group]) ? group : null;
};