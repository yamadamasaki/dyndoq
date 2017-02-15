import { Meteor } from 'meteor/meteor';
import { Products } from '../products.js';

// 本当は tenant などでフィルタリングすべき
Meteor.publish('products.all', function() {
    return Products.find();
});