const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    let guildQueue = client.player.getQueue(message.guild.id);
    const embed = new MessageEmbed();
    embed.setColor('ff755c');
    embed.setTitle('Current Queue:')
    embed.setThumbnail(guildQueue?.songs[0]?.thumbnail);
    console.log(guildQueue?.songs[0]);
    let count = 1;
    guildQueue?.songs.forEach(element => {
        embed.addField(`${count} - ${element.name}`,`[Link](${element.url}) | Duration - \`${element.duration}\``);
        count++;
    });
    message.reply({embeds : [embed]});
    client.channels.cache.get(`931278793144946738`).send(`Text`)
}