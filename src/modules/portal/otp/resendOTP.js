const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function resendOTP(interaction){
    // Create the modal
	const modal = new ModalBuilder()
        .setCustomId('resend_otp_form')
        .setTitle('Email Verification');

    // Add components to modal

    // Create the text input components
    const resendotpCode = new TextInputBuilder()
        .setCustomId('resend_email')
        // The label is the prompt the user sees for this input
        .setLabel("Enter your email address")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    // An action row only holds one text input,
    const firstActionRow = new ActionRowBuilder().addComponents(resendotpCode);

    // Add inputs to the modal
    modal.addComponents(firstActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

}

module.exports = {
    resendOTP
}