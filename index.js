const { 
    Client, 
    GatewayIntentBits, 
    ActivityType,
    IntentsBitField,
    EmbedBuilder
} = require('discord.js');
const mongoose = require('mongoose');

require('dotenv').config();
const mySecret = process.env['TOKEN'] || process.env.TOKEN;
const uri = process.env.URI;

const { sendWelcomeMessage, sendPrivateWelcomeMessage } = require('./src/modules/welcomeMessage');
const { leaveMessage } = require('./src/modules/leaveMessage');
const { customStatus } = require('./src/modules/customStatus');
const { introduce } = require('./src/modules/introduce')

// Import the functions for each command
const { pingCommand } = require('./src/commands/pingCommand');
const { authorCommand } = require('./src/commands/authorCommand');
const { reportCommand } = require('./src/commands/reportCommand');

//import modules
const { announcement } = require('./src/modules/announcement');
const { requestRole } = require('./src/modules/requestRole');
const { reports } = require('./src/modules/reports')

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    //set custom activity
    client.user.setActivity({
        name: 'Visual Studio Code 💻',
        type: ActivityType.Playing
    });
        setInterval(() => {
            client.user.setActivity(customStatus());
        }, 100000);
});

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'ping') {
            await pingCommand(client, interaction);
        } 
        
        if (interaction.commandName === 'author') {
            await authorCommand(client, interaction);
        }

        if (interaction.commandName === 'report') {
            await reportCommand(client, interaction);
        }
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;

        await reports(client, interaction)
    });
    

    //welcome message
    client.on('guildMemberAdd', (member) => {
        sendWelcomeMessage(member);

        sendPrivateWelcomeMessage(member);

        // Assign the "unverified" role to the new member
        const unverifiedRoleId = '1145347392862957649'; // Replace with the ID of the "unverified" role
        const unverifiedRole = member.guild.roles.cache.get(unverifiedRoleId);

        if (unverifiedRole) {
            member.roles.add(unverifiedRole)
                .then(() => console.log(`Assigned 'unverified' role to ${member.user.tag}`))
                .catch(console.error);
        } else {
            console.error('The "unverified" role does not exist or the provided role ID is incorrect.');
        }
    });

    //goodbye message
    client.on('guildMemberRemove', (member) => {
        leaveMessage(member);
    });

    //send announcement
    client.on('interactionCreate',(interaction)=>{
        announcement(interaction)
    });

    //request role
    client.on('interactionCreate', async (interaction) => {
        await requestRole(interaction)
    });

    //channel id for introduce your self
    const introduceYourselfChannelId = '1142757176356642827'
    //set role when user introduce its self
    client.on('messageCreate', async (message)=>{
         // Check if the message is in the "Introduce Yourself" channel
        if (message.channel.id === introduceYourselfChannelId && !message.author.bot) {
            introduce(message)
        }
    })

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to DB!');
    });

client.login(mySecret);
