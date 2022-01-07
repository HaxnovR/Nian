// use switch case
// add embeds

const { MessageEmbed } = require("discord.js");
const jikanjs = require("jikanjs");

let type = ['anime', 'manga', 'person', 'character'];

exports.run = (client, message, args) => {
	const search = async function(type,query) {
		let name = args.slice(2,args.length).join(" ");
		let data = (await jikanjs.search(type,name));		
		console.log(`len = ${data.results.length}`);
		console.log(data.results);
		if(data.results.length==0){
			message.channel.send("No Result Found");
			return;
		}
		if(data.results.length<=5){
			const embed = new MessageEmbed()
  			.setColor("2e51a2")
  			.setAuthor(`Requested by ${message.author.username}${message.author.discriminator}`,message.author.displayAvatarURL())
  			.setTitle(`Results for ${name}`)
  			.setImage(data.results[0].image_url)
			// Fields --->
  			.addField(data.results[0].name,`\[[${data.results[0].mal_id}](${data.results[0].url})\]`)

  			.setTimestamp()
  			.setFooter("Data from MyAnimeList", "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png");
  			
  			message.channel.send({ embeds: [embed] });
			return;
		}
		if(args[1]=="person" || args[1]=="character" && data.results.length>4){
			const embed = new MessageEmbed()
  			.setColor("2e51a2")
  			.setAuthor(`Requested by ${message.author.username}${message.author.discriminator}`,message.author.displayAvatarURL())
  			.setTitle(`Results for ${name}`)
  			.setThumbnail(data.results[0].image_url)
			// Fields --->
  			.addField(data.results[0].name,`\[[${data.results[0].mal_id}](${data.results[0].url})\]`)
			.addField(data.results[1].name,`\[[${data.results[1].mal_id}](${data.results[1].url})\]`)
			.addField(data.results[2].name,`\[[${data.results[2].mal_id}](${data.results[2].url})\]`)
			.addField(data.results[3].name,`\[[${data.results[3].mal_id}](${data.results[3].url})\]`)
			.addField(data.results[4].name,`\[[${data.results[4].mal_id}](${data.results[4].url})\]`)
  			
  			.setTimestamp()
  			.setFooter("Data from MyAnimeList", "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png");
  			
  			message.channel.send({ embeds: [embed] });
		}
		else{
		const embed = new MessageEmbed()
  			.setColor("2e51a2")
  			.setAuthor(`Requested by ${message.author.username}${message.author.discriminator}`,message.author.displayAvatarURL())
  			.setTitle(`Results for ${name}`)
  			.setThumbnail(data.results[0].image_url)
			// Fields --->
  			.addField(data.results[0].title,`\[[${data.results[0].mal_id}](${data.results[0].url})\] | \`${data.results[0].type}\` \`Episodes: ${data.results[0].episodes}\` \`Score: ${data.results[0].score}\`\nSynopsis: ${data.results[0].synopsis}`)
  			.addField(data.results[1].title,`\[[${data.results[1].mal_id}](${data.results[1].url})\] | \`${data.results[1].type}\` \`Episodes: ${data.results[1].episodes}\` \`Score: ${data.results[1].score}\`\nSynopsis: ${data.results[1].synopsis}`)
			.addField(data.results[2].title,`\[[${data.results[2].mal_id}](${data.results[2].url})\] | \`${data.results[2].type}\` \`Episodes: ${data.results[2].episodes}\` \`Score: ${data.results[2].score}\`\nSynopsis: ${data.results[2].synopsis}`)
			.addField(data.results[3].title,`\[[${data.results[3].mal_id}](${data.results[3].url})\] | \`${data.results[3].type}\` \`Episodes: ${data.results[3].episodes}\` \`Score: ${data.results[3].score}\`\nSynopsis: ${data.results[3].synopsis}`)
			.addField(data.results[4].title,`\[[${data.results[4].mal_id}](${data.results[4].url})\] | \`${data.results[4].type}\` \`Episodes: ${data.results[4].episodes}\` \`Score: ${data.results[4].score}\`\nSynopsis: ${data.results[4].synopsis}`)
  			
  			.setTimestamp()
  			.setFooter("Data from MyAnimeList", "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png");
  			
  			message.channel.send({ embeds: [embed] });
		}
	}
	if(args[0]==null){
		message.channel.send(`**My Anime List Database**\nUsage : \`mal <type> <query>\` \n *type:* \`anime, manga, person, character\``);
		return;
	}
	if(args[0]==="search"){
		search(args[1],args[2]);
	}
	else{
		message.channel.send(`**INVALID OPTION!** \n *Available Options:* \` \``);
	}
}