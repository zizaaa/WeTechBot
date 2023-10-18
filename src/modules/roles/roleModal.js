const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function roleModal(interaction){

	const modal = new ModalBuilder()
        .setCustomId('reuqest_role_form')
        .setTitle('Request role');

    // Create the text input components
    const roleInput = new TextInputBuilder()
        .setCustomId('requested_role')
        .setLabel("Role name")
        .setPlaceholder('ex: Web Developer')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    // An action row only holds one text input,
    const firstActionRow = new ActionRowBuilder().addComponents(roleInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

}

module.exports = {
    roleModal
}