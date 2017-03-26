import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { insertProduct } from '/imports/api/products/methods.js'
import { ingroup } from '/imports/api/accounts/utilities.js'

import './add-product.html'

Template.addProduct.onCreated(function() {
    Meteor.subscribe('user.roles')
})

Template.addProduct.events({
    'submit .add-product' (event) {
        event.preventDefault()

        const target = event.target
        const [year, name] = [target.year.value, target.name.value]
        const group = ingroup(FlowRouter.getQueryParam('group'))
        if (!group) {
            console.log("illeagal group: ", group)
            return
        }

        insertProduct.call({ group, year, name }, (error) => {
            if (error) {
                console.log('insertProduct.call', error)
            } else {
                target.year.value = target.name.value = ''
            }
        })
    },
})