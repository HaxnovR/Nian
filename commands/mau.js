const fetch = require('node-fetch');

exports.run = (client, message, args) => {
	async function fetchText(url) {
		let response = await fetch(url);
		let data = await response.json();
		console.log(data);
		message.channel.send(data.file);
	}
	message.channel.send("Here's a Mau (^._.^)ﾉ");
	fetchText('https://aws.random.cat/meow');
}