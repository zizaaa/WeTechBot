const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function otpModal(interaction){
    // Create the modal
	const modal = new ModalBuilder()
        .setCustomId('otp_form')
        .setTitle('Email Verification');

    // Add components to modal

    // Create the text input components
    const otpCode = new TextInputBuilder()
        .setCustomId('user_otp')
        // The label is the prompt the user sees for this input
        .setLabel("OTP")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    // An action row only holds one text input,
    const firstActionRow = new ActionRowBuilder().addComponents(otpCode);

    // Add inputs to the modal
    modal.addComponents(firstActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

}

module.exports = {
    otpModal
}