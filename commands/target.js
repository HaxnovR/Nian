exports.run = (client, message, args) => {
    grabbed = message.mentions.members.first();
    message.channel.send(`Targeted ${grabbed.user.username}#${grabbed.user.discriminator}`);
}