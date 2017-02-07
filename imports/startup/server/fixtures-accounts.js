import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

const createUserIfNotExists = (options) => {
    if ((options.username || options.email) &&
        (!options.username || !Accounts.findUserByUsername(options.username)) &&
        (!options.email || !Accounts.findUserByEmail(options.email))) {
        return Accounts.createUser(options);
    }
    return null;
}

const addTenantToUser = (id, tenant) => {
    Meteor.users.update(id, { $set: { tenant: tenant } });
}

const accounts = [{
    options: {
        username: 'testuser',
        email: 'test@metabolics.co.jp',
        password: 'password',
    },
    roles: ['admin'],
    group: 'default-group',
    tenant: 'tenantA',
}, {
    options: {
        username: 'testuser2',
        email: 'test2@metabolics.co.jp',
        password: 'password2',
    },
    roles: ['member', 'admin'],
    group: 'default-group',
    tenant: 'tenantB',
}, ];

export default () => {
    accounts.forEach((item, index, array) => {
        const id = createUserIfNotExists(item.options);
        if (id) {
            Roles.addUsersToRoles(id, item.roles, item.group);
            if (item.tenant) {
                addTenantToUser(id, item.tenant);
            }
        }
    })
}