import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Visitnotes } from './visitnotes.js'
import { Meteor } from 'meteor/meteor'

export const insertVisitnote = new ValidatedMethod({
    name: 'visitnote.insert',
    validate: new SimpleSchema({
        visit: { type: String },
        year: { type: SimpleSchema.Integer },
        group: { type: String },
    }).validator(),
    run: ({ visit, year, group }) => {
        return Visitnotes.insert({
            _tenant: (Meteor.user() || {}).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            financialYear: year,
            visit
        })
    },
})

export const addOffering = new ValidatedMethod({
    name: 'visitnote.addOffering',
    validate: new SimpleSchema({
        note: { type: String },
        mode: { type: String },
        product: { type: String },
    }).validator(),
    run: ({ note, mode, product }) => {
        const offering = mode === 'pre' ? 'preOfferings' : 'postOfferings'
        return Visitnotes.update(note, {
            $push: {
                [offering]: { product }
            }
        })
    },
})