// use switch case
// add embeds

const { MessageEmbed } = require("discord.js");
const jikanjs = require("jikanjs");
jikanjs.settings.version = 3;

let opt = ['anime', 'manga', 'person', 'character'];

exports.run = (client, message, args) => {
	const search = async function(type,query) {
		if(args[1]==null || !opt.includes(args[1])){
			message.channel.send("**Usage : **`mal search <option> <query>`\nOptions: `anime`,`manga`,`person`,`character`");
			return;
		}
		let name = args.slice(2,args.length).join(" ");
		let data = (await jikanjs.search(type,name));
		let len = 0;		
		console.log(`len = ${data.results.length}`);
		const embed = new MessageEmbed()
  			.setColor("2e51a2")
  			.setAuthor(`Requested by ${message.author.username}${message.author.discriminator}`,message.author.displayAvatarURL())
  			.setTitle(`Results for ${name}`)
  			.setThumbnail(data.results[0].image_url)
  			.setTimestamp()
  			.setFooter("Data from MyAnimeList", "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png");
  			
		if(data.results.length<5)len = data.results.length;
		if(data.results.length>=5)len = 5;
		if(data.results.length==0){
			message.channel.send("No Result Found");
			return;
		}
		if(args[1]=="person" || args[1]=="character"){
			data.results.slice(0,len).forEach(element => {
				embed.addField(element.name,`\[[${element.mal_id}](${element.url})\]`);
				console.log(element.name);
			});
  			message.channel.send({ embeds: [embed] });
		}
		if(args[1]=="anime" || args[1]=="manga"){
			const embed = new MessageEmbed()
			
			data.results.slice(0,len).forEach(element => {
				embed.addField(element.title,`\[[${element.mal_id}](${element.url})\] | \`${element.type}\` \`Episodes: ${element.episodes}\` \`Score: ${element.score}\`\nSynopsis: ${element.synopsis}`);
				console.log(element.name);
			});
  			message.channel.send({ embeds: [embed] });
		}
	}
	const user = async function(query) {
		if(args[1]==null){
			message.channel.send("**Enter a Username**");
			return;
		}
		let name = args[1];
		let data = (await jikanjs.loadUser(name));
		let len = 0;
		console.log(data.manga_stats);
		const embed = new MessageEmbed()
  			.setColor("2e51a2")
			.setTitle(`User: ${name}`)
  			.setThumbnail(data.image_url)
  			.setTimestamp()
  			.setFooter("Data from MyAnimeList", "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png")
			.addField("Anime Stats", `Days Watched: ${data.anime_stats.days_watched}\nMean Score: ${data.anime_stats.mean_score}\nWatching: ${data.anime_stats.watching}\nCompleted: ${data.anime_stats.completed}\nOn Hold: ${data.anime_stats.on_hold}\nPlan to Watch: ${data.anime_stats.plan_to_watch}\nTotal Entries: ${data.anime_stats.total_entries}\nRewatched: ${data.anime_stats.rewatched}\nEpisodes: ${data.anime_stats.episodes_watched}`, true )
			.addField('Inline field title', 'Some value here', true )
		
		message.channel.send({ embeds: [embed] });
	}
	const ArgZero = async function(){
		message.channel.send("**My Anime List Database**\nUsage : `mal <option> <query>` \n*Options:* `search`");
	}

	if(args[0]==null){
		ArgZero();
		return;
	}
	if(args[0]=="search"){
		search(args[1],args[2]);
	}
	if(args[0]=="user"){
		user(args[1]);
	}
	else{
		ArgZero();
	}
}