import { Meteor } from 'meteor/meteor'

import links from './fixtures-links.js'
//import customers from './fixtures-customers.js'
//import accounts from './fixtures-accounts.js'
//import members from './fixtures-members.js'
import examples from './example-fixtures.js'

Meteor.startup(() => {
    links()
        //customers()
        //accounts()
        //members()
    examples()
})