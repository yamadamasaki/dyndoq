import { Meteor } from 'meteor/meteor';

Meteor.publish('user.tenant', function() {
    if (this.userId) {
        return Meteor.users.find({ _id: this.userId }, { fields: { 'tenant': 1 } });
    } else {
        this.ready();
    }
});