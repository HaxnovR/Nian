const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new MessageEmbed();
    embed.setColor('ff755c');
    embed.setTitle(`Disconnected`);
    // message.guild.me.voice.channel.leave();
    client.leaveVoiceChannel(message.member.voice.channel.id);
    message.reply({embeds : [embed]});
}