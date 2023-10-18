async function roles(interaction, client, EmbedBuilder) {

    const rolesEmbed = new EmbedBuilder()
        .setTitle('Role Request')
        .setDescription('You can now request your desired roles. Please review the available roles before making your request.')    
        .setColor('#01ED65')
        .setTimestamp()

    await interaction.reply({
        embeds: [rolesEmbed],
        components:[
            {
                type: 1,
                components: [
                    {
                        type: 2, 
                        style: 3,
                        label: 'Request a role',
                        custom_id: 'request_role_button',
                    }
                ],
            },
        ]
    });
}

module.exports = { roles };
