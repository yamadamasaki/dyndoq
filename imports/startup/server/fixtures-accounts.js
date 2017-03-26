import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import { Roles } from 'meteor/alanning:roles'

const createUserIfNotExists = (options) => {
    if ((options.username || options.email) &&
        (!options.username || !Accounts.findUserByUsername(options.username)) &&
        (!options.email || !Accounts.findUserByEmail(options.email))) {
        return Accounts.createUser(options)
    }
    return null
}

const addTenantToUser = (id, tenant) => {
    Meteor.users.update(id, { $set: { tenant: tenant } })
}

const accounts = [{
    options: {
        username: 'testuser1',
        email: 'test1@metabolics.co.jp',
        password: 'password',
    },
    roles: ['admin'],
    group: 'default-group',
    tenant: 'tenant-a',
}, {
    options: {
        username: 'testuser2',
        email: 'test2@metabolics.co.jp',
        password: 'password',
    },
    roles: ['member'],
    group: 'default-group',
    tenant: 'tenant-a',
}, ]

export default () => {
    accounts.forEach((item) => {
        const id = createUserIfNotExists(item.options)
        if (id) {
            Roles.addUsersToRoles(id, item.roles, item.group)
            if (item.tenant) {
                addTenantToUser(id, item.tenant)
            }
        }
    })
}