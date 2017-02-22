import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import { upsertSmapColor } from '/imports/api/smaps/methods.js';

import './smaps-color-def.html';

Template.smapsColorDef.helpers({

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