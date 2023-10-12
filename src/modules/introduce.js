async function introduce(message){
    // Check if the message contains the keywords (case-insensitive)
    const content = message.content.toLowerCase();
    if (content.includes('name') && content.includes('hobby')) {
        // Assign the "verified" and "Geeky" roles to the user
        const member = message.guild.members.cache.get(message.author.id);
        if (member) {
            const roleId = '1129996554481180762';
            const geekyRoleId = '1128726567695159367';
            const undefinedRoleId = '1145347392862957649';

            const verifiedRole = message.guild.roles.cache.get(roleId);
            const geekyRole = message.guild.roles.cache.get(geekyRoleId);
            const undefinedRole = message.guild.roles.cache.get(undefinedRoleId);

            // Check if the user has the "undefined" role and remove it
            if (undefinedRole && member.roles.cache.has(undefinedRole.id)) {
                await member.roles.remove(undefinedRole);
            }

            if (verifiedRole) await member.roles.add(verifiedRole);
            if (geekyRole) await member.roles.add(geekyRole);

            // Send a welcome message
            message.reply({
                embeds:[
                    {
                        description:`Nice to meet you, @${member.user.globalName}! We hope you enjoy your time here and gain valuable knowledge in our server.`,
                        color:0x03FA6E
                    }
                ]
            });
        }
    } else {
        // Criteria not met, send an error message
        message.reply({
            embeds:[
                {
                    description:'Please follow the format when introducing yourself: Include the words "Name" and "Hobby". Example: Name:[Your Name], Hobby:[Your Hobby].',
                    color:0xFF0000
                }
            ]
        });
    }
}

module.exports = {
    introduce
}