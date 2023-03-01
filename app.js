const { App } = require('@slack/bolt');
const { JsonDB, Config } = require('node-json-db');
const { emojis } = require('./emojis.js');
const { interjections } = require('./interjections.js');
require('dotenv').config();

let custom_emojis = undefined;
if (process.env.CUSTOM_EMOJIS) {
    custom_emojis = require(`${process.env.CUSTOM_EMOJIS}`).emojis;
}

const PORT = process.env.PORT || 3000;
const SPARKLES_COMMAND_REGEX = /^<@(.*)> \+\+/;
const DATABASE_NAME = 'database';

const db = new JsonDB(new Config(DATABASE_NAME, true, true, '/'));
const token = process.env.SLACK_BOT_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

const app = new App({
    token,
    signingSecret,
});

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function getInternetPointsForUser(user_id) {
    try {
        return await db.getData('/' + user_id);
    } catch (error) {
        return 0;
    }
}

async function getUserInfo(user) {
    return app.client.users.info({
        token,
        user,
    }).then((response) => {
        return response;
    }).catch((error) => {
        return undefined;
    });
}

app.message(async ({ event }) => {
    const match = event.text.match(SPARKLES_COMMAND_REGEX);
    if (match) {
        const user_id = match[1];
        const user_info = await getUserInfo(user_id);

        if (user_info) {
            const user_name = user_info.user.name;
            const emoji = custom_emojis
                ? getRandomFromArray(custom_emojis)
                : getRandomFromArray(emojis);
            const interjection = getRandomFromArray(interjections);
            let internetPoints = await getInternetPointsForUser(user_id);

            internetPoints++;

            await db.push('/' + user_id, internetPoints);

            app.client.chat.postMessage({
                token,
                channel: event.channel,
                text: `:sparkles: ${interjection}! @${user_name} now has ${internetPoints} Internet Points™ ${emoji}`,
                parse: 'full',
            })
        }
    }
});

(async () => {
    await app.start(PORT);
    console.log(`Sparkles listening on port ${PORT}`);
})();