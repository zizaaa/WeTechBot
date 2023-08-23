const { Client, GatewayIntentBits } = require('discord.js');

require('dotenv').config();
const mySecret = process.env['TOKEN'] || process.env.TOKEN;

const { sendWelcomeMessage } = require('./modules/welcomeMessage');
const { leaveMessage } = require('./modules/leaveMessage');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

//welcome message
client.on('guildMemberAdd', (member) => {
    sendWelcomeMessage(member);
});

//goodbye message
client.on('guildMemberRemove', (member) => {
    leaveMessage(member);
});



client.login(mySecret);
