const enrollment = require('../../../model/enrollmentModel')
async function pendingInteraction(interaction, EmbedBuilder, type){
    if(type === 'reply'){
        const userId = interaction.user.id
        const data = await enrollment.findOne({userId})
        // Show the modal to the user
        const embed = new EmbedBuilder()
        .setTitle('Pending enrollment application')
        .setDescription('You currently have a pending enrollment application. Kindly await further announcements and instructions.')
        .setImage('https://i.imgur.com/z7FCU1X.png')
        .setColor(0xFF5733);

        await interaction.reply({
            embeds: [embed],
            components: [
                {
                    type: 1, // ACTION_ROW
                    components: [
                        {
                            type: 2, 
                            style: 4,
                            label: 'Cancel Enrollment',
                            custom_id:`cancel_button_${data.userId}`,
                            disabled:false,
                        },
                    ],
                },
            ],
            ephemeral: true,
        });
    }else if(type === 'update'){
        // Show the modal to the user
        const embed = new EmbedBuilder()
        .setTitle('Pending enrollment application')
        .setDescription('You currently have a pending enrollment application. Kindly await further announcements and instructions.')
        .setImage('https://i.imgur.com/z7FCU1X.png')
        .setColor(0xFF5733);

        await interaction.update({
            embeds: [embed],
            components: [
                {
                    type: 1, // ACTION_ROW
                    components: [
                        {
                            type: 2, 
                            style: 4,
                            label: 'Cancel Enrollment',
                            custom_id:'cancel_button',
                            disabled:false,
                        },
                    ],
                },
            ],
            ephemeral: true,
        });
    }
}

module.exports = {
    pendingInteraction
}