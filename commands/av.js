const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new MessageEmbed();
    let user = message.mentions.users.first() 
    || message.guild.members.cache.get(args[0])?.user
    || message.author;
    let avatar = user.displayAvatarURL({size: 1024, dynamic: true})

    embed.setTitle(`${user.username}'s Avatar`);
    embed.setColor('ff755c');
    embed.setImage(avatar);

    message.channel.send({embeds : [embed]});
}