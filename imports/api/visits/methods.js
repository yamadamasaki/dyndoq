import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Visits } from './visits.js'
import { Meteor } from 'meteor/meteor'

export const removeVisits = new ValidatedMethod({
    name: 'visits.remove',
    validate: new SimpleSchema({
        group: { type: String },
        year: { type: SimpleSchema.Integer },
        member: { type: String },
    }).validator(),
    run: ({ group, year, member }) => {
        return Visits.remove({
            _tenant: (Meteor.user() || {}).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            financialYear: year,
            member,
        })
    },
})

export const insertVisit = new ValidatedMethod({
    name: 'visit.insert',
    validate: new SimpleSchema({
        group: { type: String },
        year: { type: SimpleSchema.Integer },
        member: { type: String },
        month: { type: SimpleSchema.Integer },
        stepName: { type: String },
        grade: { type: String },
    }).validator(),
    run: ({ group, year, member, month, stepName, grade }) => {
        return Visits.insert({
            _tenant: (Meteor.user() || {}).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            _owner: Meteor.userId(),
            _timestamp: new Date().getTime(),
            financialYear: year,
            member,
            month,
            step: stepName,
            assignedStep: stepName,
            customerGrade: grade,
        })
    },
})