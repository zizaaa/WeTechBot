const auth =(interaction)=>{
    // Define the role names that you consider as admin or moderator roles
    const allowedRoles = ['Admin', 'Moderator', 'Community Tech Support'];

    // Check if the member has any of the specified roles
    const memberRoles = interaction.member.roles.cache;
    return allowedRoles.some(roleName => memberRoles.some(role => role.name === roleName));
}

module.exports = {auth}
