import { FlowRouter } from 'meteor/kadira:flow-router'
import { BlazeLayout } from 'meteor/kadira:blaze-layout'

// Import needed templates
import '../../ui/layouts/body/body.js'
import '../../ui/pages/home/home.js'
import '../../ui/pages/not-found/not-found.js'
import '../../ui/pages/customers/customers.js'
import '../../ui/pages/products/products.js'
import '../../ui/pages/smaps/smaps.js'
import '../../ui/pages/planning/planning.js'
import '../../ui/pages/visitnote/visitnote.js'

// Set up all routes in the app
FlowRouter.route('/', {
    name: 'App.home',
    action() {
        BlazeLayout.render('App_body', { main: 'App_home' })
    },
})

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('App_body', { main: 'App_notFound' })
    },
}

FlowRouter.route('/customers', {
    // 顧客データベース
    // query params: year, group
    name: 'customers',
    action() {
        BlazeLayout.render('App_body', { main: 'customers' })
    },
})

FlowRouter.route('/products', {
    // 製品データベース
    // query params: year, group
    name: 'products',
    action() {
        BlazeLayout.render('App_body', { main: 'products' })
    },
})

FlowRouter.route('/smaps', {
    // 戦略マップ
    // query params: year, group
    name: 'smaps',
    action() {
        BlazeLayout.render('App_body', { main: 'smaps' })
    },
})

FlowRouter.route('/planning/:year/:group/:member', {
    // 訪問計画
    name: 'planning',
    action() {
        BlazeLayout.render('App_body', { main: 'planning' })
    },
})

FlowRouter.route('/visitnote/:id/:mode', {
    // 訪問ノート
    name: 'visitnote',
    action() {
        BlazeLayout.render('App_body', { main: 'visitnote' })
    },
})