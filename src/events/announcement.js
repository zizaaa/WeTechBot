const { EmbedBuilder } = require('discord.js');

    async function announcement(interaction,botIcon){
        if (!interaction.isChatInputCommand()) return;

        const { commandName, options, member } = interaction;
        // Define the role names that you consider as admin or moderator roles
        const adminRoleName = 'Admin';
        const moderatorRoleName = 'Moderator';
        const CommunityTechSupport = 'Community Tech Support';

        // Check if the member has any of the specified roles
        const isAdmin = member.roles.cache.some(role => role.name === adminRoleName);
        const isModerator = member.roles.cache.some(role => role.name === moderatorRoleName);
        const isCommunityTechSupport = member.roles.cache.some(role => role.name === CommunityTechSupport);

        if (commandName === 'message') {
            if(isAdmin || isModerator || isCommunityTechSupport){
                const title = options.getString('title');
                const message = options.getString('message');
                const channel = options.getChannel('channel');
                if (channel) {
                    const embed = new EmbedBuilder()
                    .setColor('#03FA6E')
                    .setTimestamp()
                    .setTitle(`${title}!`)
                    .setThumbnail(botIcon)
                    .setDescription(message)
    
                    channel.send({embeds:[embed]});
    
                    interaction.reply(`${title} sent successfully!`);
                } else {
                    interaction.reply("Invalid Channel");
                }
            }else{
                const embed = new EmbedBuilder()
                .setColor('#03FA6E')
                .setDescription("Seems like something might have gone wrong, or it's possible that you don't currently have the necessary permissions to use this command.");
                interaction.reply({embeds:[embed]})
            }
        }
    }

    module.exports = {
        announcement
    }