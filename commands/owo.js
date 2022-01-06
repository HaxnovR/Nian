const fetch = require('node-fetch');

let opt = "ass, ero, hentai, maid, milf, oppai, oral, paizuri, selfies, uniform, ecchi";
const arr = opt.split(", ");

exports.run = (client, message, args) => {
	async function fetchText(tag) {
        let response = await fetch(`https://api.waifu.im/nsfw/${tag}`);
        let data = await response.json();
        console.log(data.images[0].url)
        message.channel.send(data.images[0].url);
    }
    if(!message.channel.nsfw){
        message.channel.send("(〜￣▽￣)〜 Use this command in a **NSFW** channel")
        return;
    }
	if(args[0]==null){
		message.channel.send(`Usage : \`uwu <option>\` \n *options:* \`${opt}\``);
		return;
	}
	if(arr.includes(args[0])){
		fetchText(args[0]);
	}
	else{
		message.channel.send(`**OwO INVALID OPTION!** \n *Available Options:* \`${opt}\``);
	}
}