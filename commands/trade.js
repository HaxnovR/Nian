const fetch = require('node-fetch');
const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: process.env.binance_api,
    APISECRET: process.env.binance_key,
  });
const logo = "https://public.bnbstatic.com/20190405/eb2349c3-b2f8-4a93-a286-8f86a62ea9d8.png"
const { MessageEmbed } = require("discord.js");
const footer = {text:"Data from Binance",iconURL:logo};

var dict = {}
let channels = process.env.apchannels.split(", ");
let traders = process.env.traders.split(", ");

exports.run = (client, message, args) => {
    if(!traders.includes(message.author.id)){
        message.reply("**Unauthorized User!**");
        return;
    }
    if(!channels.includes(message.channel.id)){
        message.reply("**Unauthorized Channel!**");
        return;
    }
	async function getPos(arg) {
        let data = await binance.futuresPositionRisk();
        for(i=0;i<148;i++){
            dict[`${data[i].symbol}`] = i;
        }
        let sym = dict[arg];
        var col = '';
        if(data[sym].unRealizedProfit>0 ? col = '2fcc41' : col = 'f23333');
        console.log(sym);
        console.log(arg);
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
  			.setFooter(footer);

        try{
            let data = await binance.futuresOpenOrders(arg);
            console.log(data[0].stopPrice);
            console.log(data[1].stopPrice);
            if(data[0].type == 'STOP_MARKET'){
                embed.addField("SL",`\`${data[0].stopPrice}\``,true);
                embed.addField("TP",`\`${data[1].stopPrice}\``,true);
            }
            else{
                embed.addField("SL",`\`${data[1].stopPrice}\``,true);
                embed.addField("TP",`\`${data[0].stopPrice}\``,true);
            }
        }
        catch(err){
            console.error(err.message);
        }
  			
  		message.channel.send({ embeds: [embed] });
	}
    async function getAll() {
        let data = await binance.futuresPositionRisk();
        let total = 0;
        for(i=0;i<148;i++){
            dict[`${data[i].symbol}`] = i;
        }
        // let sym = dict[arg];
        const embed = new MessageEmbed()
  			.setTitle(`Current Futures Positions:`)
            .setThumbnail(logo)
  			.setTimestamp()
  			.setFooter(footer);

        for(i=0;i<148;i++){
            if(data[i].entryPrice != 0){
                embed.addField(data[i].symbol,`\`${data[i].unRealizedProfit}\``);
                total += Number(data[i].unRealizedProfit);
            }
        }
        embed.addField("Total PnL",`\`\`\`${total}\`\`\``);
        var col = '';
        if(total>0 ? col = '2fcc41' : col = 'f23333')
        embed.setColor(`${col}`);
  			
  		message.channel.send({ embeds: [embed] });
	}
    async function getBal() {
        let data = await binance.futuresBalance();
        const embed = new MessageEmbed()
  			.setColor("f4bc0c")
  			.setTitle(`Current Balance USDT`)
			// Fields ---> // 6=>USDT , 8=>BUSD
            .addField('Total Balance(incl P&L):',data[6].balance)
            .addField('Available Balance:',data[6].availableBalance)
  			.setTimestamp()
  			.setFooter(footer);
  		message.channel.send({ embeds: [embed] });
		
	}
    async function closePos(arg) {
        const embed = new MessageEmbed()
            .setAuthor(`Requested by ${message.author.username}${message.author.discriminator}`,message.author.displayAvatarURL())
  			.setColor("f4bc0c")
  			.setTitle(`Vote to Close Position in ${arg}`)
			.setDescription("2/3rd Votes are required to execute command\nReact below with ✅ to Vote.")
  			.setTimestamp()
            .setFooter("This Vote will expire in 120 seconds", logo);
  			
        const expired = new MessageEmbed().setTitle("Vote Expired!");
  		message.channel.send({ embeds: [embed] }).then((msg) => {
            // msg.react('✅');
        
            // console.log(msg.reactions);
            // setTimeout(() => {
            //     msg.edit({ embeds: [expired] });                       
                                                          // TODO
            //     return;
            // }, 15000);
          });
        const filter = (reaction, user) => {
            return reaction.emoji.name == '✅';
        };
        
        message.awaitReactions({ filter, max: 4, time: 10000, errors: ['time'] })
            .then(collected => console.log(collected.size))
            .catch(collected => {
                console.log(`After a minute, only ${collected.size} out of 4 reacted.`);
            });
    }

        

    // --------------------------------------------
    if(args[0]==null){
        message.channel.send("Usage `n.trade <option>`");
        return;
    }
    if(args[0] == 'pos' && args[1] != null){
        getPos(args[1].toUpperCase());
    }
    if(args[0] == 'pos' && args[1] == null){
        getAll();
    }
    if(args[0] == 'bal'){
        getBal();
    }
    if(args[0] == 'exit' && args[1] != null){
        closePos(args[1].toUpperCase());
    }
}

/*
BTC 123
ETH 21
SOL 122
BNB 14
*/