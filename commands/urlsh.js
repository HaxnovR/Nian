const fetch = require('node-fetch');

exports.run = (client, message, args) => {
	async function fetchText(url) {
		let response = await fetch("https://gotiny.cc/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ input: url})
        });
		let data = await response.json();
		console.log(data[0].code);
		message.channel.send(`**Shortened URL:** https://gotiny.cc/${data[0].code}`);
	}
    console.log(args[0]);
	fetchText(args[0]);
}