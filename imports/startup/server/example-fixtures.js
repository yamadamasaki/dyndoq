import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'
import { Meteor } from 'meteor/meteor'
import { Customers } from '/imports/api/customers/customers.js'
import { Departments } from '/imports/api/customers/departments.js'
import { Products } from '/imports/api/products/products.js'
import { Members } from '/imports/api/members/members.js'
import { _ } from 'meteor/underscore'

const accounts = [{
        options: {
            username: '川上哲也',
            email: 'kawakami-tetsuya@metabolics.co.jp',
            password: 'kawakami'
        },
        roles: ['admin'],
        group: '第一営業部',
        tenant: 'tenant-acme',
    },
    {
        options: {
            username: '長嶋茂雄',
            email: 'nagashima-shigeo@metabolics.co.jp',
            password: 'nagashima'
        },
        roles: ['member', 'admin'],
        group: '第一営業部',
        tenant: 'tenant-acme',
    },
    {
        options: {
            username: '王貞治',
            email: 'oh-sadaharu@metabolics.co.jp',
            password: 'oh'
        },
        roles: ['member'],
        group: '第一営業部',
        tenant: 'tenant-acme',
    }
]

const registerAccounts = (accounts) => {
    accounts.forEach(item => {
        if (!Accounts.findUserByUsername(item.options.username) || !Accounts.findUserByEmail(item.options.email)) {
            const id = Accounts.createUser(item.options)
            if (id) {
                Roles.addUsersToRoles(id, item.roles, item.group);
                Meteor.users.update(id, { $set: { tenant: item.tenant } })
            }
        }
    })
}

const context = {
    _tenant: 'tenant-acme',
    _service: 'sales-reinforcement',
    _group: '第一営業部',
    _timestamp: new Date().getTime(),
    financialYear: 2016,
}

const customerTemplate = (context, name) => _.extend(_.clone(context), { name })

const customers = (context, names) => names.map(name => customerTemplate(context, name))

const registerCustomers = (customers) => {
    customers.forEach(item => { if (!Customers.findOne(_.omit(item, '_timestamp'))) Customers.insert(item) })
}

const customerId = (name) => Customers.findOne({ name })._id

const deparmentTemplate = (context, name, customerName) => _.extend(_.clone(context), { name, customer: customerId(customerName) })

const departments = (context, items) => items.map(item => deparmentTemplate(context, item[0], item[1]))

const registerDepartments = (departments) => {
    departments.forEach(item => { if (!Departments.findOne(_.omit(item, '_timestamp'))) Departments.insert(item) })
}

const productTemplate = (context, name) => _.extend(_.clone(context), { name })

const products = (context, names) => names.map(name => productTemplate(context, name))

const registerProducts = (products) => {
    products.forEach(item => { if (!Products.findOne(_.omit(item, '_timestamp'))) Products.insert(item) })
}

const memberTemplate = (context, email) => _.extend(_.clone(context), { account: accountId(email) })

const accountId = (email) => Accounts.findUserByEmail(email)._id

const members = (context, emails) => emails.map(email => memberTemplate(context, email))

const registerMembers = (members) => {
    members.forEach(item => { if (!Members.findOne(_.omit(item, '_timestamp'))) Members.insert(item) })
}

export default () => {
    registerAccounts(accounts)
    registerCustomers(customers(context, ['顧客A社', '顧客B社', '顧客C社']))
    registerDepartments(departments(context, [
        ['本社', '顧客A社'],
        ['山梨工場', '顧客A社'],
        ['福井支社', '顧客A社'],
    ]))
    registerProducts(products(context, ['製品A', '製品B', '製品C']))
    registerMembers(members(context, ['kawakami-tetsuya@metabolics.co.jp', 'nagashima-shigeo@metabolics.co.jp', 'oh-sadaharu@metabolics.co.jp']))
}