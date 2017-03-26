import { Customers } from '../../api/customers/customers.js'
import { Factory } from 'meteor/dburles:factory'
import faker from 'faker'
import { _ } from 'meteor/underscore'

export default () => {
    // if the Customers collection is empty
    if (Customers.find().count() === 0) {
        faker.locale = "ja"
        Factory.define('customer', Customers, {
            _tenant: 'tenant-a',
            _service: 'sales-reinforcement',
            _timestamp: new Date().getTime(),
            financialYear: () => _.random(2010, 2016),
            name: () => faker.company.companyName(),
        })
        _(10).times(() => Factory.create('customer'))
    }
}