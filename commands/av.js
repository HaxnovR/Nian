const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args) => {
    const embed = new MessageEmbed();
    embed.setColor('ff755c');
    if(args[0] == 'help'){
        embed.setTitle('User Avatar');
        embed.addField('Self Avatar:','use `n.av` with no extra arguments');
        embed.addField("Other's Avatar:","use `n.av <mention user>` tag a user in <mention user>");
        embed.setFooter(client.help_footer);
        message.channel.send({embeds : [embed]});
        return;
    }
    let user = message.mentions.users.first() 
    || message.guild.members.cache.get(args[0])?.user
    || message.author;
    let avatar = user.displayAvatarURL({size: 1024, dynamic: true})

    embed.setTitle(`${user.username}'s Avatar`);
    embed.setImage(avatar);

    message.channel.send({embeds : [embed]});
}