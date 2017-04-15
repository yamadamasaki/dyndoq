import { Template } from 'meteor/templating'
import { addAttender, updateAttender } from '/imports/api/visitnotes/methods.js'

import './visitnote-attenders.html'

Template.visitnoteAttenders.events({
    'submit .add-attender': event => {
        event.preventDefault()

        const name = event.target[0].value
        const [x, y, noteId] = event.target.id.split('-')
        addAttender.call({ mode: 'pre', note: noteId, name }, (error) => {
            if (error) {
                console.log('addAttender.call', error)
            }
        })
    },
    'change .cell': event => {
        event.preventDefault()

        const [cell, type] = event.currentTarget.className.split(' ')
        const value = type === 'integer' ? parseInt(event.target.value) : event.target.value
        const [attender, field, noteId, name] = event.target.id.split('-')
        const mode = 'pre'
        updateAttender.call({ noteId, name, field, value, mode }, (error) => {
            if (error) {
                console.log('updateAttender.call', error)
            }
        })
    },
})

Template.visitnoteAttenders.helpers({
    equals: (x, y, t, f) => x === y ? t : f,
});