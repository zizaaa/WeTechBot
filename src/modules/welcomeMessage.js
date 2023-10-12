const { EmbedBuilder } = require('discord.js');

function sendWelcomeMessage(member) {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.id === '1103529691354255381');
    const serverName = member.guild.name;
    const userAvatar = member.user.displayAvatarURL();

    if (welcomeChannel) {
        const embed = new EmbedBuilder()
            .setColor('#03FA6E')
            .setTitle(`Hey ${member.user.username}!`)
            .setDescription(`Step into the world of ${serverName}, where programmers unite. Introduce yourself and join the chatter about coding, development, and all things geeky!`)
            .setThumbnail(userAvatar)
            .setImage('https://i.imgur.com/qXAnwpH.gif');
        
        welcomeChannel.send({ embeds: [embed] });
    }
}

// Function to send a private welcome message to the user
function sendPrivateWelcomeMessage(member) {
    const serverName = member.guild.name;

    // Send a private welcome message to the user
    member.send(`Hello and welcome! I'm the ${serverName} bot, created by server admins to assist you in WeTech. Please complete the onboarding process to access valuable server resources. Thank you!`);
}

module.exports = {
    sendWelcomeMessage,
    sendPrivateWelcomeMessage
};