import { Template } from 'meteor/templating'
import { updateProduct } from '/imports/api/products/methods.js'

import './products-summary.html'

Template.productsSummary.helpers({
    productGrossMarginRate: (product) => product.grossMargin / product.sales * 100,
    trimAll: string => string.replace(/ /g, ""),
})

Template.productsSummary.events({
    'change .cell' (event) {
        event.preventDefault()

        const target = event.target
        const productId = target.id

        updateProduct.call({
            productId,
            field: target.form.id,
            value: parseInt(target.value),
        }), (error) => {
            if (error) {
                console.log('updateProduct.call', error)
            }
        }
    }
})