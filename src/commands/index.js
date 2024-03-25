require('dotenv').config();
const { REST,Routes } = require('discord.js');

const commands = [
    {
        name:'server-announcement',
        description:'Send announcement using wetech bot'
    },
    {
        name: 'request-roles',
        description: 'Display pending request roles',
    },
    {
        name: 'report',
        description: 'Report a user',
        options: [
            {
                type: 6,
                name: 'user',
                description: 'Mention the user you want to report',
                required: true,
            },
            {
                type: 3,
                name: 'reason',
                description: 'The reason for the report',
                required: true,
            },
        ],
    }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(
                process.env.CLIENT_ID
            ),
            { 
                body: commands 
            },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
