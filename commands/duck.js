const fetch = require('node-fetch');

exports.run = (client, message, args) => {
	async function fetchText() {
		let response = await fetch("https://random-d.uk/api/quack");
		let data = await response.json();
		console.log(data.url);
		message.channel.send(data.url);
	}
	message.channel.send("Here's a Duck");
	fetchText();
}