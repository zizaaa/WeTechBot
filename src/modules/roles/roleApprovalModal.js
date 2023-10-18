const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function roleApprovalModal(interaction){
    const [action] = interaction.customId.split('_role_');
    console.log(action)
	const modal = new ModalBuilder()
        .setCustomId(`request_role_${action}`)
        .setTitle('Request role');

    // Create the text input components
    const roleInput = new TextInputBuilder()
        .setCustomId('requested_role_approval')
        .setLabel("Request Number")
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
    roleApprovalModal
}