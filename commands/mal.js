const jikanjs = require("jikanjs");

let type = ['anime', 'manga', 'person', 'character'];

exports.run = (client, message, args) => {
	const search = async function(type,query) {
		let data = (await jikanjs.search(type,query));
    	console.log(data.results[0].url);
        message.channel.send(data.results[0].url);
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