const { 
    Client, 
    GatewayIntentBits, 
    ActivityType,
    IntentsBitField,
    EmbedBuilder
} = require('discord.js');
const mongoose = require('mongoose');

require('dotenv').config();
const mySecret = process.env.TOKEN;
const uri = process.env.URI;
const guild = process.env.GUILD_ID

// Import the functions for each command
const { reportCommand } = require('./src/commands/reportCommand');

//import modules
const { announceModal } = require('./src/modules/announcement/announceModal');
const { processAnnouncement } = require('./src/modules/announcement/processAnnouncement');

const { reports } = require('./src/modules/reports');
const { sendWelcomeMessage, sendPrivateWelcomeMessage } = require('./src/modules/welcomeMessage');
const { leaveMessage } = require('./src/modules/leaveMessage');
const { customStatus } = require('./src/modules/customStatus');
const { introduce } = require('./src/modules/introduce');

const { roleModal } = require('./src/modules/roles/roleModal')
const { roleModalLogic } = require('./src/modules/roles/roleModalLogic')
const { roleApproval } = require('./src/modules/roles/roleApproval');
const { roles } = require('./src/modules/roles/roles');
const { roleApprovalModal } = require('./src/modules/roles/roleApprovalModal')

const {auth} = require('./src/modules/auth')

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
        
        //announcement
        if(interaction.commandName === 'server-announcement'){
            if(auth(interaction)){
                // await announcement(interaction)
                await announceModal(interaction)
            }else{
                await interaction.reply({
                    embeds:[
                        {
                            description:'You don\'t have permission to use this feature.'
                        }
                    ],
                    ephemeral: true
                })
                return;
            }
            
        }

        //request role
        if(interaction.commandName === 'request-roles'){
            if(auth(interaction)){
                await roles(interaction,client,EmbedBuilder)
            }else{
                await interaction.reply({
                    embeds:[
                        {
                            description:'You don\'t have permission to use this feature.'
                        }
                    ],
                    ephemeral: true
                })
                return;
            }
            
        }

        if (interaction.commandName === 'report') {
            await reportCommand(client, interaction);
        }
    });

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;

        const customId = interaction.customId;
        //request role button
        if(customId === 'request_role_button'){
            await roleModal(interaction)
        }
        //role approval
        if(customId === 'approve_role_button' || customId === 'disapprove_role_button'){

            if(auth(interaction)){
                await roleApprovalModal(interaction)
            }else{
                await interaction.reply({
                    embeds:[
                        {
                            description:'You don\'t have permission to use this feature.'
                        }
                    ],
                    ephemeral: true
                })
                return;
            }
        }
        //report btn
        if(customId.startsWith('approve_report_') || customId.startsWith('disapprove_report_')){
            await reports(client, interaction)
        }
    });

    client.on('interactionCreate', async(interaction)=>{
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'announcement_form') {
            await processAnnouncement(interaction)
        }

        if (interaction.customId === 'reuqest_role_form') {
            await roleModalLogic(interaction,EmbedBuilder)
        }

        if (interaction.customId.startsWith('request_role_')) {
            await roleApproval(interaction,EmbedBuilder)
        }
    })
    

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
