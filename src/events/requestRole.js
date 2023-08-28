const { EmbedBuilder } = require('discord.js');

async function requestRole(interaction){

    const pendingRoleRequests = [];

    if (!interaction.isChatInputCommand()) return;

    const { commandName, options, member, guild } = interaction;
    
    if (commandName === 'role') {
        const roleName = options.getString('role');
        console.log(roleName)

        // Add the role request to the pending list
        pendingRoleRequests.push({
            roleName: roleName,
            user: member.user,
        });

        // // Display the list of available roles
        // const availableRoles = guild.roles.cache.filter(role => role.name);
        // // const availableRolesList = availableRoles.map((role) => `@${role.name}`);
        // const availableRolesList = availableRoles.map(role => `<@&${role.id}>`);

        // Display the list of pending roles
        const pendingRolesList = pendingRoleRequests.map((request, index) => `${index + 1}. \`${request.roleName}\` -> requested by ${request.user.globalName}`);
        
        const rolesEmbed = new EmbedBuilder()
            .setTitle('Pending Role Requests')
            .setColor('#03FA6E')
            .setDescription(pendingRolesList.join('\n'))
            .setTimestamp()
            .setFooter({text:'Please wait for the admin to review and accept your requested roles.'})

        await interaction.reply({ embeds: [rolesEmbed] });
    }

    if (commandName === 'approve') {
        const requestNumber = parseInt(options.getString('approve'));
        const requestInfo = pendingRoleRequests[requestNumber - 1];

        if (!requestInfo) {
            await interaction.reply(`Invalid request number.`);
            return;
        }

        const adminRole = guild.roles.cache.find(role => role.name === 'Admin'); // Adjust the role name as needed

        if (!adminRole || !member.roles.cache.has(adminRole.id)) {
            await interaction.reply(`Only admins can approve role requests.`);
            return;
        }

        const randomColor = Math.floor(Math.random()*16777215).toString(16); // Generate a random color code

        let role = guild.roles.cache.find(role => role.name.toLowerCase() === requestInfo.roleName.toLowerCase());
        if (!role) {
            // Create the role if it doesn't exist
            role = await guild.roles.create({
                name: requestInfo.roleName,
                color: randomColor, // Set the random color
                permissions: [],
            });
        }

        const requester = guild.members.cache.get(requestInfo.user.id);
        if (requester) {
            await requester.roles.add(role);
            await interaction.reply(`Role \`${role}\` has been granted to <@${requester.id}> as requested.`);
            pendingRoleRequests.splice(requestNumber - 1, 1);
        } else {
            await interaction.reply(`Error: Requester not found.`);
        }

        // // Update the list of available roles
        // const availableRolesList = guild.roles.cache.map(role => `<@&${role.id}>`);

        // Update the list of pending roles
        const pendingRolesList = pendingRoleRequests.map((request, index) => `${index + 1}. ${request.roleName} -> requested by ${request.user.globalName}`);

        const rolesEmbed = new EmbedBuilder()
            .setTitle('Pending Role Requests')
            .setColor('#03FA6E')
            .setDescription(pendingRolesList.length > 0 ? pendingRolesList.join('\n') : 'No pending role requests')
            .setTimestamp()

        await interaction.followUp({ embeds: [rolesEmbed] });
    }
}

module.exports = {
    requestRole
}