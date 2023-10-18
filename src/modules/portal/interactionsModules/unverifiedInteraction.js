async function unverifiedInteraction(interaction, EmbedBuilder, type){

    if(type === 'reply'){
        console.log(type)
        // Show the modal to the user
        const embed = new EmbedBuilder()
        .setTitle('Unverified Enrollment Application')
        .setDescription('You currently have an unverified enrollment application. To proceed, please verify your email address by resending your OTP to your email.')
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
                            style: 2,
                            label: 'Resend OTP',
                            custom_id:'resend_otp_button',
                            disabled:false
                        },
                    ],
                },
            ],
            ephemeral: true,
        });
    }else if(type === 'update'){
        // Show the modal to the user
        const embed = new EmbedBuilder()
        .setTitle('Unverified Enrollment Application')
        .setDescription('You currently have an unverified enrollment application. To proceed, please verify your email address by resending your OTP to your email.')
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
                            style: 2,
                            label: 'Resend OTP',
                            custom_id:'resend_otp_button',
                            disabled:false
                        },
                    ],
                },
            ],
            ephemeral: true,
        });
    }
}

module.exports = {
    unverifiedInteraction
}