import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Smaps } from '/imports/api/smaps/smaps.js';
import { SmapColors } from '/imports/api/smaps/smap-colors.js';
import { SmapsDetail } from '/imports/api/smaps/smaps-detail.js';

export const insertSmap = new ValidatedMethod({
    name: 'smaps.insert',
    validate: new SimpleSchema({
        group: { type: String },
        year: { type: SimpleSchema.Integer },
        name: { type: String },
        elementType: { type: String },
        criteria: { type: String },
        description: { type: String },
    }).validator(),
    run: ({ group, year, name, elementType, description, criteria }) => {
        return Smaps.insert({
            _tenant: Meteor.users.findOne({ _id: Meteor.userId() }, { fields: { 'tenant': 1 } }).tenant,
            _service: 'sales-reinforcement',
            _group: group,
            _owner: Meteor.userId(),
            _timestamp: new Date().getTime(),
            financialYear: parseInt(year),
            name,
            elementType,
            criteria,
            description,
        });
    },
});

export const updateSmap = new ValidatedMethod({
    name: 'smaps.update',
    validate: new SimpleSchema({
        smapId: { type: String },
        field: { type: String },
        value: { type: String },
    }).validator(),
    run: ({ smapId, field, value }) => {
        Smaps.update({ _id: smapId }, {
            $set: {
                [field]: value,
            }
        });
    },
});

export const addToSmap = new ValidatedMethod({
    name: 'smaps.addto',
    validate: new SimpleSchema({
        smapId: { type: String },
        elements: { type: [String] },
    }).validator(),
    run: ({ smapId, elements }) => {
        Smaps.update({ _id: smapId }, { $set: { elements, } });
    }
});

export const upsertSmapColor = new ValidatedMethod({
    name: 'smap-colors.upsert',
    validate: new SimpleSchema({
        customersSmapId: { type: String },
        productsSmapId: { type: String },
        kind: { type: String, allowedValues: ['fg', 'bg', 'both', 'none'] },
        fgcolor: { type: String, regEx: /#[0-9a-fA-F]{6}/, optional: true },
        bgcolor: { type: String, regEx: /#[0-9a-fA-F]{6}/, optional: true },
    }).validator(),
    run: ({ customersSmapId, productsSmapId, kind, fgcolor, bgcolor }) => {
        let colors = {};
        if (kind === 'fg' || kind === 'both') colors.fgcolor = fgcolor;
        if (kind === 'bg' || kind === 'both') colors.bgcolor = bgcolor;
        SmapColors.upsert({ customersSmapId, productsSmapId }, { $set: colors }, true);
    }
});

export const upsertSmapsDetail = new ValidatedMethod({
    name: 'smaps-detail.upsert',
    validate: new SimpleSchema({
        customerId: { type: String },
        productId: { type: String },
        field: { type: String },
        value: { type: Number },
    }).validator(),
    run: ({ customerId, productId, field, value }) => {
        SmapsDetail.upsert({ customerId, productId }, {
            $set: {
                [field]: value,
            }
        });
    },
});