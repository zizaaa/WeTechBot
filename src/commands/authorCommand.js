const { EmbedBuilder } = require('discord.js');

async function authorCommand(client, interaction){
    // Get the bot's icon (avatar)
    const botIcon = client.user.displayAvatarURL();

    const embed = new EmbedBuilder()
        .setColor('#03FA6E')
        .setTimestamp()
        .setTitle('Hello geeky!')
        .setThumbnail(botIcon)
        .setDescription("I'm WeTech Bot, and I'm here to assist the WeTech server community. I was created by `Ziza` with the aim of enhancing your experience and fostering a dynamic programming community. Whether it's welcoming new members or playing your favorite tunes, I'm here to help make our server even more vibrant!");
    
    await interaction.reply({ embeds: [embed] });
}

module.exports = {
    authorCommand
}