const { EmbedBuilder } = require('discord.js');

    const pendingRoleRequests = [];

async function requestRole(interaction){

    if (!interaction.isChatInputCommand()) return;

    const { commandName, options, member, guild } = interaction;
    
    if (commandName === 'role') {
        const roleName = options.getString('role');

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
        const pendingRolesList = pendingRoleRequests.map((request, index) => `${index + 1}. \`${request.roleName}\` -> requested by ${request.user.tag}`);
        
        const rolesEmbed = new EmbedBuilder()
            .setTitle('Pending Role Requests')
            .setColor('#FF7900')
            .setDescription(pendingRolesList.join('\n'))
            .setTimestamp()
            .setFooter({text:'Please wait for the admin to review and accept your requested roles.'})

        await interaction.reply({ embeds: [rolesEmbed] });
    }

    if (commandName === 'approve') {
        const requestNumber = parseInt(options.getString('number'));
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
            const granted = new EmbedBuilder()
            .setColor('#03FA6E')
            .setDescription(`Role ${role} has been granted to <@${requester.id}> as requested.`)

            await requester.roles.add(role);
            await interaction.reply({ embeds: [granted] });

            pendingRoleRequests.splice(requestNumber - 1, 1);
        } else {
            await interaction.reply(`Error: Requester not found.`);
        }

        // // Update the list of available roles
        // const availableRolesList = guild.roles.cache.map(role => `<@&${role.id}>`);

        // Update the list of pending roles
        const pendingRolesList = pendingRoleRequests.map((request, index) => `${index + 1}. \`${request.roleName}\` -> requested by ${request.user.tag}`);

        const rolesEmbed = new EmbedBuilder()
            .setTitle('Pending Role Requests')
            .setColor('#FF7900')
            .setDescription(pendingRolesList.length > 0 ? pendingRolesList.join('\n') : 'No pending role requests')
            .setTimestamp()

        await interaction.followUp({ embeds: [rolesEmbed] });
    }
    
    if (commandName === 'disapprove') {
        const requestNumber = parseInt(options.getString('number'));

        if (isNaN(requestNumber) || requestNumber <= 0 || requestNumber > pendingRoleRequests.length) {
            await interaction.reply(`Invalid request number.`);
            return;
        }

        const adminRole = guild.roles.cache.find(role => role.name === 'Admin'); // Adjust the role name as needed

        if (!adminRole || !member.roles.cache.has(adminRole.id)) {
            await interaction.reply(`Only admins can disapprove role requests.`);
            return;
        }

        const removedRequest = pendingRoleRequests.splice(requestNumber - 1, 1)[0];
        
        if (removedRequest) {
            const disapp = new EmbedBuilder()
            .setColor('#F70000')
            .setDescription(`Sorry, the requested role name "${removedRequest.roleName}" is considered inappropriate. <@${removedRequest.user.id}> please choose a different role name.`)

            await interaction.reply({ embeds: [disapp] });
            
            
            // Update the list of pending roles
            const pendingRolesList = pendingRoleRequests.map((request, index) => `${index + 1}. \`${request.roleName}\` -> requested by ${request.user.tag}`);
            
            const rolesEmbed = new EmbedBuilder()
                .setTitle('Pending Role Requests')
                .setColor('#FF7900')
                .setDescription(pendingRolesList.length > 0 ? pendingRolesList.join('\n') : 'No pending role requests')
                .setTimestamp();

            await interaction.followUp({ embeds: [rolesEmbed] });
        } else {
            await interaction.reply(`Error: Request not found.`);
        }
    }
}

module.exports = {
    requestRole
}