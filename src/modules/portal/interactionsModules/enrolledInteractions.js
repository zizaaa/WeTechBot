async function enrolledInteractions(interaction,EmbedBuilder,data){
    console.log(data.id)
    const wavingHandEmoji = String.fromCodePoint(0x1F44B);
    const embed = new EmbedBuilder()
    .setTitle(`Hello, ${interaction.user.username} ${wavingHandEmoji}`)
    .setDescription(`Welcome to the WeTech Portal. You are now officially enrolled.`)
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
                        disabled:true
                    },
                    {
                        type: 2, 
                        style: 2,
                        label: 'Profile',
                        custom_id:`profile_button_${data.id}`
                    },
                ],
            },
        ],
        ephemeral: true,
    });
}

module.exports = { enrolledInteractions }