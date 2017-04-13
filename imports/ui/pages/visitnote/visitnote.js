import { FlowRouter } from 'meteor/kadira:flow-router'

import './visitnote.html'

Template.visitnote.helpers({
    visitId: () => FlowRouter.getParam('visitid'),
    mode: () => FlowRouter.getParam('mode')
})