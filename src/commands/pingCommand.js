async function pingCommand(client, interaction){
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
    
        const ping = reply.createdTimestamp - interaction.createdTimestamp;
    
        interaction.editReply(
            `Client: ${ping}ms | Websocket: ${client.ws.ping}ms`
        );
}

module.exports = {
    pingCommand
};