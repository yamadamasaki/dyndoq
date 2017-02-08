import { Template } from 'meteor/templating';

import './accounting-customers.html';

Template.accountingCustomers.helpers({
    customerGrossMarginRate: (customer) => customer.grossMargin / customer.sales * 100,
    customerSalesVariableCost: (customer) => customer.salesVariableCost / customer.sales * 100,
});