require('dotenv').config();
const { REST,Routes } = require('discord.js');

const commands = [
    {
        name: 'author',
        description: "Learn more about my origins and my creator's mission for our community!",
    },
    {
        name: 'ping',
        description: 'Replies with the bot ping!',
    },
    {
        name:'message',
        description:'Send message using wetech bot',
        options:[
            {
                type: 3,
                name: 'title',
                description: 'Enter your title',
                required: true
            },
            {
                type: 3,
                name: 'message',
                description: 'Enter your message',
                required: true
            },
            {
                type:7,
                name:'channel',
                description: 'The channel where you want to send the announcement',
                required: true
            }
        ]
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
