
async function processAnnouncement(interaction){
    const channelId = interaction.fields.getTextInputValue('channel_id');
    const title = interaction.fields.getTextInputValue('title');
    const message = interaction.fields.getTextInputValue('message');

    const channel = await interaction.guild.channels.fetch(channelId);

        if(!channel){
            await interaction.reply({
                embeds:[
                    {
                        title: 'Channel Not Found',
                        description: 'I couldn\'t find the channel. Please make sure you provided a valid channel ID.',
                        color: 0xFF0000, // You can customize the color
                    },
                ],
                ephemeral:true
            })
            return
        }

        await channel.send({
            embeds:[
                {
                    title:`${title}`,
                    description:`${message}`,
                    color:0x03FA6E
                }
            ]
        });

        await interaction.reply({
            content:'Done!',
            ephemeral: true,
        });
}

module.exports = {
    processAnnouncement,
}