const fetch = require('node-fetch');

exports.run = (client, message, args) => {
	async function fetchText() {
        let key = args[0].toUpperCase();
		let response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${key}USDT`);
		let data = await response.json();
		console.log(data);
		// message.channel.send(data.file);
        if(data.symbol=='undefined'){
            message.channel.send(`**Unknown Symbol**`);
        }
        else{
            message.channel.send(`Current Price of **${data.symbol} = ${data.price.slice(0,-4)}**`);
        }
	}
    if(args[0]==null){
        message.channel.send("specify a Coin/Token. Usage: `crypto <option>`, eg: crypto BTC");
        return;
    }
	fetchText();
}