import { Template } from 'meteor/templating';
import { Smaps } from '/imports/api/smaps/smaps.js';
import { SmapColors } from '/imports/api/smaps/smap-colors.js';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import './smaps-show.html';

Template.smapsShow.onCreated(() => {
    Tracker.autorun(() => {
        Meteor.subscribe('smaps.all');
        Meteor.subscribe('smap-colors.all');
    });
});

Template.smapsShow.helpers({
    fgcolor: (cId, pId, year) => {
        const black = '#000000';
        const c = findSmapColor(cId, pId, year);
        return c ? c.fgcolor || black : black;
    },
    bgcolor: (cId, pId, year) => {
        const white = '#ffffff';
        const c = findSmapColor(cId, pId, year);
        return c ? c.bgcolor || white : white;
    },

});

function findSmapColor(cId, pId, year) {
    const cSmaps = Smaps.find({ financialYear: year, elementType: 'customers' });
    const pSmaps = Smaps.find({ financialYear: year, elementType: 'products' });

    if (!cSmaps || !pSmaps) return null;

    let color = null;

    cSmaps.forEach(c => {
        pSmaps.forEach(p => {
            if (c.elements.indexOf(cId) !== -1 && p.elements.indexOf(pId) !== -1) {
                color = SmapColors.findOne({ customersSmapId: c._id, productsSmapId: p._id });
            }
        });
    });
    return color;
    // 複数あったら最後のものが勝ち
    // 全部舐めているけど, 区分数は多くても10x10までも行かないと思っている
}