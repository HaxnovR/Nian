const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {

    if(!message.member.voice.channel){
        message.reply('You must be in a voice channel (￣﹃￣)');
        return;
    }
    // if(voice.getVoiceConnection(message.guild.id)?.state.status !== 'ready'){
    //     voice.joinVoiceChannel({
    //         channelId: message.member.voice.channel.id,
    //         guildId: message.guild.id,
    //         adapterCreator: message.guild.voiceAdapterCreator
    //     })
    //     return message.reply(`Connected to ${message.member.voice.channel.name}`);
    // }
    // if(voice.getVoiceConnection(message.guild.id)?.joinConfig.channelId !== message.member.voice.channel.id){
    //     return message.reply('You must be in the same voice channel as Nian 〜(￣▽￣〜)');
    // }
    let guildQueue = client.player.getQueue(message.guild.id);
    let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(() => {
            if(!guildQueue)
                queue.stop();
        });
    console.log(song);
}