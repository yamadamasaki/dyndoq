import { ValidatedMethod } from 'meteor/mdg:validated-method'
import { check } from 'meteor/check'
import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'
import { Chats } from './chats.js'

export const postMessage = new ValidatedMethod({
    name: 'post.chat',
    validate: args => {
        check(args, {
            user: String,
            channel: String,
            text: String,
        })
    },
    run: ({ user, channel, text }) => {
        if (Meteor.isServer) {
            const chat = Chats.findOne({ user }) || _createChat(user)
            if (!chat) return
            _postMessage(chat, channel, text)
        }
    },
})

// TODO: 今はHTTPのエラーをちゃんと返していない

// TODO: 保存している authToken, userId が向こうになっている場合には (rocket.chatサーバの再起動など) 再ログインが必要

const _createChat = user => {
    const u = Meteor.users.findOne(user)
    if (!u) return
    const { username, password } = u.services.chat
    const { chat_url, chat_type } = Meteor.settings
    if (chat_type !== 'rocket.chat') return
    const response = HTTP.post(`${chat_url}/api/v1/login`, {
        headers: { 'Content-type': 'application/json' },
        data: { username, password },
    })
    if (response.statusCode != 200) return
    const { authToken, userId } = response.data.data
    return Chats.findOne(Chats.insert({ user, authToken, userId }))
}

const _postMessage = (chat, channel, text) => {
    const { chat_url, chat_type } = Meteor.settings
    if (chat_type !== 'rocket.chat') return
    HTTP.post(`${chat_url}/api/v1/chat.postMessage`, {
        headers: { 'X-Auth-Token': chat.authToken, 'X-User-Id': chat.userId, 'Content-type': 'application/json' },
        data: { channel, text },
    })
}