const { MessageEmbed } = require("discord.js");
const nianImg = "https://user-images.githubusercontent.com/60336295/147240671-42d2a7bc-a9c8-48d1-8af1-763e1556dd66.png";

const footer = {
    text:"Developed and Maintained by HaxnovR#4256",
}

exports.run = async (client, interaction, options) => {
    const help = client.help;
    
    const embed = new MessageEmbed();
    embed.setTitle("Nian Commands");
    embed.setColor('ff755c');
    embed.setDescription("To get detailed info on a command use \n`n.<command name> help`")
    embed.setImage(nianImg,100);
    embed.addField("Images:", help.fieldImages);
    embed.addField("Utility:", help.fieldUtil);
    if(interaction.channel.nsfw){
        embed.addField("NSFW:", help.fieldNSFW);
    }
    else{
        embed.addField("NSFW:","||Use this command in a NSFW channel to see options||");
    }
    embed.setFooter(footer);

    interaction.reply({
        embeds : [embed],
        ephemeral : interaction.options.data[0]?.value || false
    });
}