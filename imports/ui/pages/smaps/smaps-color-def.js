import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './smaps-color-def.html';

Template.smapsColorDef.helpers({

});

Template.smapsColorDef.events({
    'click .btn': event => {
        const [cSmapId, pSmapId] = event.currentTarget.id.split('-');

        $(`#${cSmapId}-${pSmapId}-fgpalette`).colorPalette()
            .on('selectColor', function(e) {
                console.log('.', e.color);
                $(`#${cSmapId}-${pSmapId}-color i`).css('color', e.color);
            });
        $(`#${cSmapId}-${pSmapId}-bgpalette`).colorPalette()
            .on('selectColor', function(e) {
                console.log('..', e.color);
                $(`#${cSmapId}-${pSmapId}-color i`).css('background-color', e.color);
            });
    },
});