import { Template } from 'meteor/templating'
import { insertCustomer } from '/imports/api/customers/methods.js'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Meteor } from 'meteor/meteor'
import { ingroup } from '/imports/api/accounts/utilities.js'

import './add-customer.html'

Template.addCustomer.onCreated(function() {
    Meteor.subscribe('user.roles')
})

Template.addCustomer.events({
    'submit .add-customer' (event) {
        event.preventDefault()

        const target = event.target
        const [year, name] = [target.year.value, target.name.value]
        const group = ingroup(FlowRouter.getQueryParam('group'))
        if (!group) {
            console.log("illeagal group: ", group)
            return
        }

        insertCustomer.call({ group, year, name }, (error) => {
            if (error) {
                console.log('insertCustomer.call', error)
            } else {
                target.year.value = target.name.value = ''
            }
        })
    },
})