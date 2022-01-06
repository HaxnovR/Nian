const { fetchNeko } = require("nekos-best.js");

let opt = "baka, bite, blush, bored, cry, cuddle, dance, facepalm, feed, happy, highfive, hug, kiss, laugh, pat, poke, pout, shrug, slap, sleep, smile, smug, stare, think, thumbsup, tickle, wave, wink";
const arr = opt.split(", ");

exports.run = (client, message, args) => {
	const getNeko = async function(req) {
		let data = (await fetchNeko(req));
    	console.log(data.url); 
		message.channel.send(data.url);
	}
	if(args[0]==null){
		message.channel.send(`Usage : \`uwu <option>\` \n *options:* \`${opt}\``);
		return;
	}
	if(arr.includes(args[0])){
		getNeko(args[0]);
	}
	else{
		message.channel.send(`**INVALID OPTION!** \n *Available Options:* \`${opt}\``);
	}
}