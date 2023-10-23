const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

async function enrollmentModal(interaction){
    const [action, course] = interaction.customId.split('_button_');
    // Create the modal
    let newCourse = course === 'web' ? 'Web Dev':course === 'c++' ? 'C++':course === 'python' ? 'Python':course === 'java' ? 'Java':''
	const modal = new ModalBuilder()
        .setCustomId(`enrollment_form_${course}`)
        .setTitle(`${newCourse} Course Enrollment`);

    // Add components to modal

    // Create the text input components
    const firstName = new TextInputBuilder()
        .setCustomId('first_name')
        // The label is the prompt the user sees for this input
        .setLabel("First name")
        .setPlaceholder('John')
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const lastName = new TextInputBuilder()
        .setCustomId('last_name')
        // The label is the prompt the user sees for this input
        .setLabel("Last name")
        .setPlaceholder('Doe')
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const genderInput = new TextInputBuilder()
        .setCustomId('user_gender')
        .setLabel("Gender")
        .setPlaceholder('Male/Female')
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short)
        //set to required
        .setRequired(true);

    const emailInput = new TextInputBuilder()
        .setCustomId('user_email')
        .setLabel("Email")
        .setPlaceholder('johndoe@gmail.com')
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short)
        //set to required
        .setRequired(true);

    const birthDateInput = new TextInputBuilder()
        .setCustomId('user_birthDate')
        .setLabel('Birthdate')
        .setPlaceholder('MM/DD/YYYY')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    // An action row only holds one text input,
    const firstActionRow = new ActionRowBuilder().addComponents(firstName);
    const secondActionRow = new ActionRowBuilder().addComponents(lastName);
    const thirdActionRow = new ActionRowBuilder().addComponents(genderInput);
    const fourthActionRow = new ActionRowBuilder().addComponents(emailInput);
    const fifthActionRow = new ActionRowBuilder().addComponents(birthDateInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow,secondActionRow,thirdActionRow,fourthActionRow,fifthActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);

}

module.exports = {
    enrollmentModal
}