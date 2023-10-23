const rolesRequest = require('../../model/roleRequest')

async function roleModalLogic(interaction,EmbedBuilder){
    const user = interaction.member.user
    const role = interaction.fields.getTextInputValue('requested_role');
    // const adminRole = interaction.guild.roles.cache.find(role => role.name === 'Admin');

        if(!role || !user){
            interaction.reply({
                embeds:[
                    {
                        description:'Something went wrong!'
                    }
                ]
            })

            return;
        }

        const requestedRoles = new rolesRequest({
            user:{...user},
            role,
            status:'Pending'
        })
        await requestedRoles.save()

    const rolesFromDB = await rolesRequest.find()

    // Display the list of pending roles
    const pendingRolesList = rolesFromDB.map((request, index) => `${index + 1}. \`${request.role}\` -> requested by <@${request.user.id}> -> status: \`${request.status}\``);

    const rolesEmbed = new EmbedBuilder()
    .setTitle('Role Requests')
    .setColor('#FF7900')
    .setDescription(pendingRolesList.join('\n'))
    .setTimestamp()
    .setFooter({text:'Please wait for the admin to review and accept your requested roles.'})

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

module.exports = {
    roleModalLogic,
}