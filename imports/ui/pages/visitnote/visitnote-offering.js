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

const _sumOfSales = offerings => offerings.reduce((acc, val) => acc + val.unitPrice * val.quantity, 0)
const _sumOfGrossMargin = offerings => offerings.reduce((acc, val) => acc + (val.unitPrice - val.cost) * val.quantity, 0)

Template.visitnoteOffering.helpers({
    sales: (unitPrice, quantity) => unitPrice * quantity,
    grossMargin: (unitPrice, quantity, cost) => (unitPrice - cost) * quantity,
    grossMarginRate: (unitPrice, cost) => (unitPrice - cost) / unitPrice * 100,
    products: noteId => {
        const note = Visitnotes.findOne(noteId) || {}
        const visit = Visits.findOne(note.visit) || {}
        const products = Products.find({ _group: visit._group, financialYear: visit.financialYear }).fetch()
        return products
    },
    nameOfProduct: productId => (Products.findOne(productId) || {}).name,
    sumOfSales: offerings => offerings ? _sumOfSales(offerings) : 0,
    sumOfGrossMargin: offerings => offerings ? _sumOfGrossMargin(offerings) : 0,
    totalGrossMarginRate: offerings => offerings ? _sumOfGrossMargin(offerings) / _sumOfSales(offerings) * 100 : 0,
})

Template.visitnoteOffering.events({
    'submit .add-offering': event => {
        event.preventDefault()

        const productId = event.target[0].value
        const [, , noteId] = event.target.id.split('-')
        const note = Visitnotes.findOne(noteId)
        if (note.preOfferings.filter(it => it.product === productId)) return
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