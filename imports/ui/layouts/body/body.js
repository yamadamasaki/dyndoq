import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './body.html'

Template.App_body.helpers({
    userId: () => Meteor.userId(),
    tenant: () => {
        const u = Meteor.users.findOne({ _id: Meteor.userId() })
        return u ? u.tenant : "n/a"
    }
})

Template.App_body.onCreated(function() {
    Meteor.subscribe('user.tenant')
})