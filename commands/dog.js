// https://random.dog/woof.json
const fetch = require('node-fetch');

exports.run = (client, message, args) => {
	async function fetchText() {
		let response = await fetch("https://random.dog/woof.json");
		let data = await response.json();
		console.log(data.url);
		message.channel.send(data.url);
	}
	message.channel.send("Here's a Doggo (👉ﾟヮﾟ)👉");
	fetchText();
}