import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { upsertSmapColor } from '/imports/api/smaps/methods.js';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { SmapColors } from '/imports/api/smaps/smap-colors.js';
import { FlowRouter } from 'meteor/kadira:flow-router'

import './smaps-color-def.html';

Template.smapsColorDef.helpers({
    fgcolor: (cSmapId, pSmapId) => {
        const black = '#000000';
        const c = SmapColors.findOne({ customersSmapId: cSmapId, productsSmapId: pSmapId });
        return c ? c.fgcolor || black : black;
    },
    bgcolor: (cSmapId, pSmapId) => {
        const white = '#ffffff';
        const c = SmapColors.findOne({ customersSmapId: cSmapId, productsSmapId: pSmapId });
        return c ? c.bgcolor || white : white;
    },
});

Template.smapsColorDef.onCreated(() => {
    Tracker.autorun(() => {
        const u = Meteor.user()
        const g = FlowRouter.getQueryParam('group')
        if (u && g) Meteor.subscribe('smap-colors.bygroup', u.tenant, g);
    });
});

Template.smapsColorDef.events({
    'click .btn': event => {
        const [cSmapId, pSmapId] = event.currentTarget.id.split('-');

        $(`#${cSmapId}-${pSmapId}-fgpalette`).colorPalette()
            .on('selectColor', function(e) {
                upsertSmapColor.call({
                    customersSmapId: cSmapId,
                    productsSmapId: pSmapId,
                    kind: 'fg',
                    fgcolor: e.color,
                }), (error) => {
                    if (error) {
                        console.log('upsertSmapColor.call', error);
                    }
                }
                $(`#${cSmapId}-${pSmapId}-color i`).css('color', e.color);
            });
        $(`#${cSmapId}-${pSmapId}-bgpalette`).colorPalette()
            .on('selectColor', function(e) {
                upsertSmapColor.call({
                    customersSmapId: cSmapId,
                    productsSmapId: pSmapId,
                    kind: 'bg',
                    bgcolor: e.color,
                }), (error) => {
                    if (error) {
                        console.log('upsertSmapColor.call', error);
                    }
                }
                $(`#${cSmapId}-${pSmapId}-color i`).css('background-color', e.color);
            });
    },
});