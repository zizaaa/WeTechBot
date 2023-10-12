
    async function announcement(interaction){
        if (!interaction.isChatInputCommand()) return;

        const { commandName, options, member,user } = interaction;
        // Define the role names that you consider as admin or moderator roles
        const adminRoleName = 'Admin';
        const moderatorRoleName = 'Moderator';
        const CommunityTechSupport = 'Community Tech Support';

        // Check if the member has any of the specified roles
        const isAdmin = member.roles.cache.some(role => role.name === adminRoleName);
        const isModerator = member.roles.cache.some(role => role.name === moderatorRoleName);
        const isCommunityTechSupport = member.roles.cache.some(role => role.name === CommunityTechSupport);

        if (commandName === 'server-announcement') {
            if(isAdmin || isModerator || isCommunityTechSupport){
                const message = options.getString('message');
                const channel = options.getChannel('channel');

                if (channel) {
                    await channel.send({
                        embeds:[
                            {
                                title:'Announcement!',
                                description:`${message}`,
                                color:0x03FA6E
                            }
                        ]
                    });
    
                    await interaction.reply({
                        content:'Announcement sent successfully!',
                        ephemeral: true,
                    });
                } else {
                    interaction.reply({
                        content:"Invalid Channel",
                        ephemeral: true,
                    });
                }
            }else{
                interaction.reply({
                    embeds:[
                        {
                            title:'Access denied!',
                            description:"You don't currently have the necessary permissions to use this command.",
                            color:0xFF0000
                        }
                    ],
                    ephemeral: true,
                })
            }
        }
    }

    module.exports = {
        announcement
    }