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

module.exports = {
    sendWelcomeMessage
};