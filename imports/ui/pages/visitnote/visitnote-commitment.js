import { Template } from 'meteor/templating'
import { commitNote } from '/imports/api/visitnotes/methods.js'

import './visitnote-commitment.html'

Template.visitnoteCommitment.events({
    'submit .commitment': event => {
        event.preventDefault()

        const [, noteId, mode] = event.target.id.split('-')

        commitNote.call({ noteId, mode }), (error) => {
            if (error) {
                console.log('commitNote.call', error)
            }
        }
    }
})