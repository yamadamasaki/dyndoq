import { Template } from 'meteor/templating';

import './products-summary.html';

Template.productsSummary.helpers({
    productGrossMarginRate: (product) => product.grossMargin / product.sales * 100,
    trimAll: string => string.replace(/ /g, ""),
});