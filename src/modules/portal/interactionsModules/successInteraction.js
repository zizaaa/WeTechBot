async function successInteraction(interaction, EmbedBuilder){
    // Show the modal to the user
    const embed = new EmbedBuilder()
    .setTitle('Email Verification')
    .setDescription('An email with a one-time password (OTP) has been sent to your registered email address. Please check your inbox or spam folder. To complete the verification process, click the "OTP" button below and enter the OTP you received.')
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
                        label: 'OTP',
                        custom_id:'otp_button',
                        disabled:false
                    },
                ],
            },
        ],
        ephemeral: true,
    });
}

module.exports = {
    successInteraction
}