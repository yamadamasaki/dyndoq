import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { Visits } from '/imports/api/visits/visits.js'
import { updateGoal } from '/imports/api/visitnotes/methods.js'

import './visitnote-goals.html'

Template.visitnoteGoals.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        if (u) {
            Meteor.subscribe('visits.all', u.tenant)
        }
    })
})

const visitOf = (steps, visit) => {
    const v = Visits.findOne(visit)
    return v ? steps.find(it => it.name === v.step) : {}
}

Template.visitnoteGoals.helpers({
    goals: (def, note) => visitOf(def, note).goals,
    methods: (def, note) => visitOf(def, note).methods,
    isChecked: (note, name, field, type) => {
        const t = note[type]
        if (!t) return ''
        const n = t.find(it => it.name === name)
        if (!n) return ''
        return n[field] === true ? 'checked' : ''
    },
    text: (note, name, field, type) => {
        const t = note[type]
        if (!t) return ""
        const n = t.find(it => it.name === name)
        if (!n) return ""
        return n[field] || ""
    },
})

Template.visitnoteGoals.events({
    'change .cell' (event) {
        event.preventDefault()

        const [part, note, name] = event.target.id.split("-")
        let list, field, value
        switch (part) {
            case 'goalUse':
                list = 'goals'
                field = 'isSelected'
                value = event.target.checked
                break
            case 'methodUse':
                list = 'methods'
                field = 'isSelected'
                value = event.target.checked
                break
            case 'methodTodo':
                list = 'methods'
                field = 'todo'
                value = event.target.value
                break
            default:
                return
        }

        updateGoal.call({ note, list, field, name, value }), (error) => {
            if (error) {
                console.log('updateGoal.call', error)
            }
        }
    }
})