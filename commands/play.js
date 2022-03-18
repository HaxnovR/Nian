const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    client.player.on('songChanged', (queue, newSong, oldSong) => {
        const embed = new MessageEmbed();
        embed.setTitle(`Now Playing:`);
        embed.setColor('ff755c');
        embed.setDescription(`${newSong.name}`);
        embed.setThumbnail(newSong.thumbnail);
        console.log(queue.player.queues.get('920947659232137236').guild.systemChannelId);
        console.log(`${newSong} is now playing.`)
    });

    if(!message.member.voice.channel){
        message.reply('You must be in a voice channel (￣﹃￣)').then(msg => {
            setTimeout(() => msg.delete(), 5000);
          });
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
}