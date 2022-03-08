const { MessageEmbed } = require("discord.js");
const nianImg = "https://user-images.githubusercontent.com/60336295/147240671-42d2a7bc-a9c8-48d1-8af1-763e1556dd66.png";

// Field Strings
const fieldImages = `\`dog\` - get an image of a random Dog
\`duck\` - get an image of a random duck
\`mau\` - get an image of a random cat
\`uwu\` - get a random anime image eg: \`uwu hug\`
`;

const fieldUtil = `\`av\` - get an user's avatar
\`clear\` - clear previous bot chats
\`crypto\` - get the latest price for a cryptocurrency
\`mal\` - get data from MyAnimeList
\`spotify\` - get data from Spotify
\`upload\` - upload an image to imgur and get its link
\`urlsh\` - shorten an URL
`;

const fieldNSFW = "`owo`"

const footer = {
    text:"Developed and Maintained by HaxnovR#4256",
}

// Main Export
exports.run = (client, message, args) => {
    async function defHelp(){
        const embed = new MessageEmbed();
        embed.setTitle("Nian Commands");
        embed.setDescription("To get detailed info on a command use \n`n.<command name> help`")
        embed.setImage(nianImg,100);
        embed.addField("Images:", fieldImages);
        embed.addField("Utility:", fieldUtil);
        if(message.channel.nsfw){
            embed.addField("NSFW:", fieldNSFW);
        }
        else{
            embed.addField("NSFW:","||Use this command in a NSFW channel to see options||");
        }
        embed.setFooter(footer);
        message.reply({ embeds: [embed] });
    }
	if (args[0] == null){
        defHelp();
    }
    else{
        message.channel.send("To get detailed info on a command use \n`n.<command name> help`");
    }
    // export default defHelp;
}

