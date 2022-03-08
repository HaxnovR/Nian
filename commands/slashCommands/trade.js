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

exports.run = async (client, interaction, options) => {
    let opt = options.data[0]?.options[0] || 'null';
    if(!traders.includes(interaction.user.id)){
        interaction.reply("**Unauthorized User!**");
        return;
    }
    if(!channels.includes(interaction.channel.id)){
        interaction.reply("**Unauthorized Channel!**");
        return;
    }

    if(options.data[0].name == 'bal'){
        let data = await binance.futuresBalance();
        const embed = new MessageEmbed()
  			.setColor("f4bc0c")
  			.setTitle(`Current Balance USDT`)
			// Fields ---> // 6=>USDT , 8=>BUSD
            .addField('Total Balance(incl P&L):',data[6].balance)
            .addField('Available Balance:',data[6].availableBalance)
  			.setTimestamp()
  			.setFooter(footer);
  		interaction.reply({ embeds: [embed] });
    }

    if(options.data[0].name == 'pos' && opt !== 'null'){
        let data = await binance.futuresPositionRisk();
        for(i=0;i<148;i++){
            dict[`${data[i].symbol}`] = i;
        }
        let arg = `${opt.value}usdt`.toUpperCase();
        console.log(arg);
        let sym = dict[arg];
        var col = '';
        if(data[sym].unRealizedProfit>0 ? col = '2fcc41' : col = 'f23333');
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
        interaction.reply({
            embeds: [embed]
        })
        return;
    }
    if(options.data[0].name == 'pos' && opt == 'null'){
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

        interaction.reply({
            embeds: [embed]
        })
        return;
    }
}