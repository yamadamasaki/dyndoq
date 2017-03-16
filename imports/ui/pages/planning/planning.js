import { Template } from 'meteor/templating';

import './planning.html';

Template.planning.helpers({
    items: function() {
        return [{ name: 'Item0', number: 0 }, { name: 'Item1', number: 1 }, { name: 'Item2', number: 2 }, { name: 'Item3', number: 3 }, { name: 'Item4', number: 4 }, { name: 'Item5', number: 5 }, ];
    }
});

Template.planning.onRendered(function() {
    dragula([document.getElementById('left1'), document.getElementById('right1')]);
});