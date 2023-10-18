async function updateRequestRole(data,interaction,EmbedBuilder){

    const pendingRolesList = data.map((request, index) => `${index + 1}. \`${request.role}\` -> requested by \`${request.user.globalName}\` -> status: \`${request.status}\``);

    const rolesEmbed = new EmbedBuilder()
    .setTitle('Role Requests')
    .setColor('#FF7900')
    .setDescription(pendingRolesList.join('\n'))
    .setTimestamp()
    .setFooter({text:'Please review the available roles before making your request and wait for the admin to review and accept your requested roles.'})

    await interaction.update({ 
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
                    },
                    {
                        type: 2, 
                        style: 2,
                        label: 'Approve',
                        custom_id: 'approve_role_button',
                    },
                    {
                        type: 2, 
                        style: 2,
                        label: 'Disapprove',
                        custom_id: 'disapprove_role_button',
                    },
                ],
            },
        ]
    });
}

module.exports = { updateRequestRole }