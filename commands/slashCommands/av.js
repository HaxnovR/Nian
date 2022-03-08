const { MessageEmbed } = require("discord.js");

exports.run = async (client, interaction, options) => {
    const embed = new MessageEmbed();
    embed.setColor('ff755c');
    let avatar = interaction.options.data[0].user.displayAvatarURL({size: 1024, dynamic: true});

    embed.setTitle(`${interaction.options.data[0].user.username}'s Avatar`);
    embed.setImage(avatar);

    interaction.reply({
        embeds : [embed],
        ephemeral : interaction.options.data[1]?.value || false
    });
}