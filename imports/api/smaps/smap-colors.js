import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Mongo } from 'meteor/mongo';

export const SmapColors = new Mongo.Collection('smap_colors');

const SmapColorSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true,
    },
    customersSmapId: {
        type: String, // _id
    },
    productsSmapId: {
        type: String, // _id
    },
    fgcolor: {
        type: String,
        defaultValue: '#000000', // black
    },
    bgcolor: {
        type: String,
        defaultValue: '#ffffff', // white
    },
});

SmapColors.attachSchema(SmapColorSchema);