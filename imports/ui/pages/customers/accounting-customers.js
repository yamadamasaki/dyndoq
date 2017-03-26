import { Template } from 'meteor/templating'
import { updateCustomer } from '/imports/api/customers/methods.js'

import './accounting-customers.html'

Template.accountingCustomers.helpers({
    customerGrossMarginRate: (customer) => customer.grossMargin / customer.sales * 100,
    customerSalesVariableCost: (customer) => customer.salesVariableCost / customer.sales * 100,
    trimAll: string => string.replace(/ /g, ""),
})

Template.accountingCustomers.events({
    'change .cell' (event) {
        event.preventDefault()

        const target = event.target
        const customerId = target.id

        updateCustomer.call({
            customerId,
            field: target.form.id,
            value: parseInt(target.value),
        }), (error) => {
            if (error) {
                console.log('updateCustomer.call', error)
            }
        }
    }
})