const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    let guildQueue = client.player.getQueue(message.guild.id);
    console.log(guildQueue);
}