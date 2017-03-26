// Tests for the behavior of the customers collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor'
import { assert } from 'meteor/practicalmeteor:chai'
import { Customers } from './customers.js'

if (Meteor.isServer) {
    describe('customers collection', function() {
        it('insert correctly', function() {
            const customerId = Customers.insert({
                _tenant: 'tenant1',
                _service: 'service1',
                _timestamp: new Date().getTime(),
                financialYear: 2016,
                name: 'A社',
            }, function(error, result) {
                console.log("error: ", error)
                console.log("result: ", result)
            })
            const added = Customers.find({ _id: customerId })
            const collectionName = added._getCollectionName()
            const count = added.count()

            assert.equal(collectionName, 'customers')
            assert.equal(count, 1)
        })
    })
}