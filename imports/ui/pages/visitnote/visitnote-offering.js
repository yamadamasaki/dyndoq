import { Template } from 'meteor/templating'
import { Visits } from '/imports/api/visits/visits.js'
import { Visitnotes } from '/imports/api/visitnotes/visitnotes.js'
import { Products } from '/imports/api/products/products.js'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { addOffering, updateOffering } from '/imports/api/visitnotes/methods.js'

import './visitnote-offering.html'

Template.visitnoteOffering.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        if (u) {
            Meteor.subscribe('products.all', u.tenant)
            Meteor.subscribe('visits.all', u.tenant)
            Meteor.subscribe('visitnotes.all', u.tenant)
        }
    })
})

Template.visitnoteOffering.helpers({
    sales: (unitPrice, quantity) => unitPrice * quantity,
    grossMargin: (unitPrice, quantity, cost) => (unitPrice - cost) * quantity,
    grossMarginRate: (unitPrice, quantity, cost) => 100 - (cost / unitPrice) * quantity * 100,
    products: noteId => {
        const note = Visitnotes.findOne(noteId) || {}
        const visit = Visits.findOne(note.visit) || {}
        const products = Products.find({ _group: visit._group, financialYear: visit.financialYear }).fetch()
        return products
    },
    nameOfProduct: productId => (Products.findOne(productId) || {}).name,
})

Template.visitnoteOffering.events({
    'submit .add-offering': event => {
        event.preventDefault()

        const productId = event.target[0].value
        const [x, y, noteId] = event.target.id.split('-')
        const note = Visitnotes.findOne(noteId)
        if (!note) return
        addOffering.call({ mode: 'pre', note: noteId, product: productId }, (error) => {
            if (error) {
                console.log('addOffering.call', error)
            }
        })
    },
    'change .cell': event => {
        event.preventDefault()

        const value = parseInt(event.target.value)
        const [field, noteId, productId] = event.target.id.split('-')
        const mode = 'pre'
        updateOffering.call({ noteId, productId, field, value, mode }, (error) => {
            if (error) {
                console.log('updateOffering.call', error)
            }
        })
    },
})