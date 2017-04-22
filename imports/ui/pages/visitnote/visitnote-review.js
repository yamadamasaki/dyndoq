import { Template } from 'meteor/templating'
import { postMessage } from '/imports/api/chats/methods.js'
import { Meteor } from 'meteor/meteor'

import './visitnote-review.html'

Template.visitnoteReview.events({
    'submit .review-request': (event) => {
        event.preventDefault()

        const text = event.target.children[0].firstElementChild.value
        const user = Meteor.userId()
        const channel = "#general"

        postMessage.call({ user, channel, text }), (error) => {
            if (error) {
                console.log('postMessage.call', error)
            }
        }
    }
})