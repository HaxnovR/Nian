const fetch = require('node-fetch');
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.binance_api,
    APISECRET: process.env.binance_key,
  });
const logo = "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png"
const { MessageEmbed } = require("discord.js");

var dict = {}

exports.run = (client, message, args) => {
	async function getPos(arg) {
        let data = await binance.futuresPositionRisk();
        for(i=0;i<148;i++){
            dict[`${data[i].symbol}`] = i;
        }
        let sym = dict[arg];
        var col = '';
        if(data[sym].unRealizedProfit>0 ? col = '2fcc41' : col = 'f23333')
        console.log(data[sym]);
        const embed = new MessageEmbed()
  			.setColor(`${col}`)
  			.setTitle(`Current Futures Position in ${arg}`)
            .setThumbnail(logo)
			// Fields --->
            .addField(`Margin: \$${data[sym].isolatedMargin.slice(0,-6)} | Leverage: ${data[sym].leverage}x | ${data[sym].marginType}`,
            `\`\`\`json
PnL: \$${data[sym].unRealizedProfit.slice(0,-6)}
            
Entry Price: ${data[sym].entryPrice}

Current Price: ${data[sym].markPrice}

Liquidation Price: ${data[sym].liquidationPrice}\`\`\`
            `)
  			.setTimestamp()
  			.setFooter("Data from Binance");
  			
  		message.channel.send({ embeds: [embed] });
	}
    async function getBal() {
        let data = await binance.futuresBalance();
        console.info(data[6]);
        const embed = new MessageEmbed()
  			.setColor("f4bc0c")
  			.setTitle(`Current Balance USDT <:tetherusdt:930403003737968681>`)
			// Fields --->
            .addField('Total Balance(incl P&L):',data[6].balance)
            .addField('Available Balance:',data[6].availableBalance)
  			.setTimestamp()
  			.setFooter("Data from Binance", logo);
  			
  		message.channel.send({ embeds: [embed] });
		
	}

    // --------------------------------------------
    if(args[0]==null){
        message.channel.send("Usage `n.trade <option>`");
        return;
    }
    if(args[0] == 'pos'){
        getPos(args[1].toUpperCase());
    }
    if(args[0] == 'bal'){
        getBal();
    }
}

/*
BTC 123
ETH 21
SOL 122
BNB 14
*/