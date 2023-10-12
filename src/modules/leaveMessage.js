const { EmbedBuilder } = require('discord.js');

function leaveMessage(member) {
    const goodbyeChannel = member.guild.channels.cache.find(channel => channel.id === '1103529691354255381');
    const serverName = member.guild.name;
    const userAvatar = member.user.displayAvatarURL();

    if (goodbyeChannel) {
        const embed = new EmbedBuilder()
            .setColor('#FF5733')
            .setTitle(`Farewell, ${member.user.username}`)
            .setDescription(`Sad to see you go from ${serverName}. Keep coding and stay geeky!`)
            .setThumbnail(userAvatar)
            .setImage('https://media.tenor.com/pRTPXrxI2UAAAAAM/crying-meme-black-guy-cries.gif');
            
        goodbyeChannel.send({ embeds: [embed] });
    }
}

module.exports = {
    leaveMessage
};
