const { 
    Client, 
    GatewayIntentBits, 
    ActivityType,
    IntentsBitField
} = require('discord.js');


require('dotenv').config();
const mySecret = process.env['TOKEN'] || process.env.TOKEN;

const { sendWelcomeMessage } = require('./src/modules/welcomeMessage');
const { leaveMessage } = require('./src/modules/leaveMessage');
const { customStatus } = require('./src/modules/customStatus');

// Import the functions for each command
const { pingCommand } = require('./src/commands/pingCommand')
const { authorCommand } = require('./src/commands/authorCommand')

//import event
const { announcement } = require('./src/events/announcement')

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
    });

    //welcome message
    client.on('guildMemberAdd', (member) => {
        sendWelcomeMessage(member);
    });

    //goodbye message
    client.on('guildMemberRemove', (member) => {
        leaveMessage(member);
    });

    //send announcement
    client.on('interactionCreate',(interaction)=>{
        // Get the bot's icon (avatar)
        const botIcon = client.user.displayAvatarURL();
        
        announcement(interaction,botIcon)
    });


client.login(mySecret);
