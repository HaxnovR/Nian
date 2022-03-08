exports.run = async (client, interaction, options) => {
    slash = client.slash;
    interaction.channel.send('**Pinging...**').then (async (msg) =>{
        msg.delete();
        await interaction.reply({
            content: `Latency is **${msg.createdTimestamp - interaction.createdTimestamp}ms**`,
            ephemeral: false
        })
    })   
}