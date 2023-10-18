async function homeInteraction(interaction,EmbedBuilder){
    const wavingHandEmoji = String.fromCodePoint(0x1F44B);
    const embed = new EmbedBuilder()
    .setTitle(`Hello, ${interaction.user.username} ${wavingHandEmoji}`)
    .setDescription(`Welcome to WeTech Portal, please select your destination.`)
    .setImage('https://i.imgur.com/z7FCU1X.png')
    .setColor(0xFF5733);

    await interaction.reply({
        embeds: [embed],
        components: [
            {
                type: 1, // ACTION_ROW
                components: [
                    {
                        type: 2, // BUTTON
                        style: 3,
                        label: 'Enrollment',
                        custom_id: 'enroll_button',
                    },
                    {
                        type: 2, 
                        style: 2,
                        label: 'Profile',
                        custom_id:'profile_button',
                        disabled:true
                    },
                ],
            },
        ],
        ephemeral: true,
    });
}

module.exports = { homeInteraction }