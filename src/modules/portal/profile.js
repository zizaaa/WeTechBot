async function profile(client,interaction){
    await interaction.reply({
        embeds:[
            {
                description:'This feature is presently unavailable; our development team is currently working on it.'
            }
        ],
        ephemeral:true
    })
}

module.exports = {
    profile
}