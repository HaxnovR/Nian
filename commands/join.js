const { MessageEmbed } = require("discord.js");
const voice = require('@discordjs/voice');

exports.run = (client, message, args) => {
    const embed = new MessageEmbed();
    if(!message.member.voice.channel){
        message.reply('You must be in a voice channel (￣﹃￣)');
        return;
    }
    if(voice.getVoiceConnection(message.guild.id)?.state.status == 'ready'){
        return message.reply('Nian is already in a voice channel 〜(￣▽￣〜)');
    }
    embed.setColor('ff755c');
    embed.setTitle(`Joined ${message.member.voice.channel.name}`);
    voice.joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    })
    console.log(voice.getVoiceConnections());
    message.reply({embeds : [embed]});
}