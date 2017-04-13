import { Meteor } from 'meteor/meteor'
import { assert } from 'meteor/practicalmeteor:chai'

import { Visitnotes } from './visitnotes.js'
import { Visits } from '../visits/visits.js'
import { Members } from '../members/members.js'

import { _ } from 'meteor/erasaur:meteor-lodash'

const base = {
    _tenant: 'tenant1',
    _service: 'service1',
    financialYear: 2016,
}

const member = Members.insert(_.extend(_.clone(base)))
const visit = Visits.insert(_.extend(_.clone(base), { member }))

if (Meteor.isServer) {
    describe('visitnotes collection', function() {
        it('必須項目のみを持つ最少のインスタンスを insert する', function() {
            const noteId = Visitnotes.insert(_.extend(_.clone(base), {
                visit,
            }), function(error, result) {
                console.log("error: ", error)
                console.log("result: ", result)
            })
            const added = Visitnotes.find({ _id: noteId })
            const collectionName = added._getCollectionName()
            const count = added.count()

            assert.equal(collectionName, 'visitnotes')
            assert.equal(count, 1)
        })
    })
}