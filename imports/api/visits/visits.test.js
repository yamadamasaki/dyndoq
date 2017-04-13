// Tests for the behavior of the visits collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor'
import { assert } from 'meteor/practicalmeteor:chai'

import { Visits } from './visits.js'
import { Members } from '../members/members.js'

import { insertVisit } from '/imports/api/visits/methods.js'

import { _ } from 'meteor/erasaur:meteor-lodash'

const base = {
    _tenant: 'tenant1',
    _service: 'service1',
    financialYear: 2016,
}

const member = Members.insert(_.extend(_.clone(base)))

if (Meteor.isServer) {
    describe('visits collection', function() {
        it('必須項目のみを持つ最少のインスタンスを insert する', function() {
            const visitId = Visits.insert(_.extend(_.clone(base), {
                member,
            }), function(error, result) {
                console.log("error: ", error)
                console.log("result: ", result)
            })
            const added = Visits.find({ _id: visitId })
            const collectionName = added._getCollectionName()
            const count = added.count()

            assert.equal(collectionName, 'visits')
            assert.equal(count, 1)
        })
        it('通常は insert 時に step, month, customerGrade も指定される', function() {
            const visitId = Visits.insert(_.extend(_.clone(base), {
                member,
                step: 'step1',
                customerGrade: 'most important',
                month: 10,
            }), function(error, result) {
                console.log("error: ", error)
                console.log("result: ", result)
            })
            const added = Visits.find({ _id: visitId })
            const collectionName = added._getCollectionName()
            const count = added.count()

            assert.equal(collectionName, 'visits')
            assert.equal(count, 1)
        })
        it('mdg:validated-method を経由して, insert する', function() {
            const visitId = insertVisit.call({
                group: 'group1',
                year: 2016,
                member,
                month: 10,
                stepName: 'step1',
                grade: 'grade1'
            }, (error) => {
                if (error) {
                    console.log('insertCustomer.call', error)
                }
            })
            const added = Visits.find({ _id: visitId })
            const collectionName = added._getCollectionName()
            const count = added.count()

            assert.equal(collectionName, 'visits')
            assert.equal(count, 1)
        })
    })
}