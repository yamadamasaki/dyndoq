import { Template } from 'meteor/templating'
import { Smaps } from '/imports/api/smaps/smaps.js'
import { SmapColors } from '/imports/api/smaps/smap-colors.js'
import { SmapsDetail } from '/imports/api/smaps/smaps-detail.js'
import { Tracker } from 'meteor/tracker'
import { Meteor } from 'meteor/meteor'
import { Customers } from '/imports/api/customers/customers.js'
import { Products } from '/imports/api/products/products.js'
import { check } from 'meteor/check'
import { upsertSmapsDetail } from '/imports/api/smaps/methods.js'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './smaps-show.html'

Template.smapsShow.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        const g = FlowRouter.getQueryParam('group')
        if (u && g) {
            Meteor.subscribe('smaps.bygroup', u.tenant, g)
            Meteor.subscribe('smap-colors.bygroup', u.tenant, g)
            Meteor.subscribe('customers.bygroup', u.tenant, g)
            Meteor.subscribe('products.bygroup', u.tenant, g)
            Meteor.subscribe('smaps-detail.bygroup', u.tenant, g)
        }
    })
})

Template.smapsShow.helpers({
    fgcolor: (cId, pId, year) => {
        const black = '#000000'
        const c = findSmapColor(cId, pId, year)
        return c ? c.fgcolor || black : black
    },
    bgcolor: (cId, pId, year) => {
        const white = '#ffffff'
        const c = findSmapColor(cId, pId, year)
        return c ? c.bgcolor || white : white
    },
    customers: ids => {
        return ids ? ids.map(e => {
            return Customers.findOne(e)
        }) : []
    },
    products: ids => {
        return ids ? ids.map(e => {
            return Products.findOne(e)
        }) : []
    },
    inc: n => n + 1,
    isFirst: (product, elements) => {
        if (!product || !elements || elements.length === 0) return false
        return elements[0] === product._id
    },
    detail: (customerId, productId, kind) => {
        check(customerId, String)
        check(productId, String)
        check(kind, String)
        const d = SmapsDetail.findOne({ customerId, productId }, {
            [kind]: 1
        })
        return d && d[kind]
    },
})

Template.smapsShow.events({
    'change .cell' (event) {
        event.preventDefault()

        const target = event.target
        const field = event.currentTarget.id
        const [customerId, productId] = target.id.split('-')

        upsertSmapsDetail.call({
            customerId,
            productId,
            field,
            value: Number(target.value),
        }), (error) => {
            if (error) {
                console.log('upsertSmapsDetail.call', error)
            }
        }
    },
})

function findSmapColor(cId, pId, year) {
    const cSmaps = Smaps.find({ financialYear: year, elementType: 'customers' })
    const pSmaps = Smaps.find({ financialYear: year, elementType: 'products' })

    if (!cSmaps || !pSmaps) return null

    let color = null

    cSmaps.forEach(c => {
        pSmaps.forEach(p => {
            if (c.elements.indexOf(cId) !== -1 && p.elements.indexOf(pId) !== -1) {
                color = SmapColors.findOne({ customersSmapId: c._id, productsSmapId: p._id })
            }
        })
    })
    return color
        // 複数あったら最後のものが勝ち
        // 全部舐めているけど, 区分数は多くても10x10までも行かないと思っている
}