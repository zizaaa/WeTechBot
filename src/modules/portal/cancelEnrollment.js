const enrollment = require('../../model/enrollmentModel');

async function cancelEnrollment(client, interaction, EmbedBuilder) {
    try {
        const [action, userId] = interaction.customId.split('_button_');
        const data = await enrollment.findOne({ userId });

        if (!data) {
            const embed = new EmbedBuilder()
            .setTitle('Application Canceled 😔')
            .setDescription(`We're sorry to see that you've canceled your enrollment application. If you decide to enroll again, please feel free to start the process whenever you're ready. Our team is here to assist you!`)
            .setImage('https://i.imgur.com/z7FCU1X.png')
            .setColor(0xFF5733);
    
            await interaction.update({
                embeds: [embed],
                components:[
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
                                custom_id:'profile_button'
                            },
                        ],
                    }
                ],
                ephemeral: true,
            });

            return;
        }

        await data.deleteOne({ userId });

        const embed = new EmbedBuilder()
        .setTitle('Application Canceled 😔')
        .setDescription(`We're sorry to see that you've canceled your enrollment application. If you decide to enroll again, please feel free to start the process whenever you're ready. Our team is here to assist you!`)
        .setImage('https://i.imgur.com/z7FCU1X.png')
        .setColor(0xFF5733);

        await interaction.update({
            embeds: [embed],
            components:[
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
                }
            ],
            ephemeral: true,
        });

    } catch (error) {
        console.error(error);
        await interaction.reply({
            embeds: [
                {
                    description: 'An error occurred. Please contact our support team for further assistance.',
                }
            ],
            ephemeral: true,
        });
    }
}

module.exports = {
    cancelEnrollment
};
