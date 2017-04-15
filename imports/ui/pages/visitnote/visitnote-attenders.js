import { Template } from 'meteor/templating'
import { addAttender } from '/imports/api/visitnotes/methods.js'

import './visitnote-attenders.html'

Template.visitnoteAttenders.events({
    'submit .add-attender': event => {
        event.preventDefault()

        console.log(".add-attender: ", event)

        const name = event.target[0].value
        const [x, y, noteId] = event.target.id.split('-')
        addAttender.call({ mode: 'pre', note: noteId, name }, (error) => {
            if (error) {
                console.log('addAttender.call', error)
            }
        })
    },
})