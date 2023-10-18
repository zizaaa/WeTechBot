const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function announceModal(interaction){

	const modal = new ModalBuilder()
        .setCustomId('announcement_form')
        .setTitle('Request role');

    // Create the text input components
    const channel = new TextInputBuilder()
        .setCustomId('channel_id')
        .setLabel("Channel ID")
        .setPlaceholder('ex: 1156588322790051840')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const title = new TextInputBuilder()
        .setCustomId('title')
        .setLabel("Title")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const message = new TextInputBuilder()
        .setCustomId('message')
        .setLabel("Message")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    // An action row only holds one text input,
    const firstActionRow = new ActionRowBuilder().addComponents(channel);
    const secondActionRow = new ActionRowBuilder().addComponents(title);
    const thirdActionRow = new ActionRowBuilder().addComponents(message);

    // Add inputs to the modal
    modal.addComponents(firstActionRow,secondActionRow,thirdActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

}

module.exports = {
    announceModal
}