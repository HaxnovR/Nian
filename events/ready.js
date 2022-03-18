const logger = require('../clientLogs/logger');
const Discord = require('discord.js');
const fetch = require('node-fetch');

logger.setLevel('all');

module.exports = async (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    logger.info(`\n\n\n-------------------------------------- NEW INSTANCE ---------------------------------------\n
    \t\t\twebSocket Connection successful, Client Logged in at ${new Date().toLocaleTimeString()}
    \t\t\ton channels: ${client.channels.cache.size} | on Servers: ${client.guilds.cache.size} | for Users: ${client.guilds.cache.size}
____________________________________________________________________________________________________________`);

    // Load Slash Commands
    let slash;
    let serverID = '';
    let mode = client.mode // prod or dev

    // NIOS = 544222557843488778
    // Dev = 920947659232137236

    // development //
    if(mode == 'dev'){
        serverID = '920947659232137236';
    }
    // production //
    if(mode == 'prod'){
        serverID = '544222557843488778';
    }

    let guild = client.guilds.cache.get(serverID);
    guild.commands.fetch().then(commands => console.log(commands));
    guild.commands.set([]);
    client.application.commands.set([]);
    if(mode == 'prod' ? slash = client.application.commands : slash = guild.commands);
    let nios = guild.commands;

    // slash.create({
    //     name: 'ping',
    //     description: 'Pings the bot'
    // })
    // slash.create({
    //     name: 'av',
    //     description: 'Get the avatar of a user',
    //     options: [
    //         {
    //             name: 'user',
    //             required: true,
    //             description: 'get avatar of mentioned user',
    //             type: Discord.Constants.ApplicationCommandOptionTypes.MENTIONABLE
    //         },
    //         {
    //             name: 'hidden',
    //             required: false,
    //             description: 'only you can see the message if TRUE',
    //             type: Discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
    //         }
    //     ]
    // })
    // // change slash to nios in production
    // nios.create({
    //     name: 'trade',
    //     description: 'binance futures trading',
    //     options: [
    //         {
    //             name: 'pos',
    //             description: 'get the balance of the futures account',
    //             type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
    //             options: [
    //                 {
    //                     name: 'symbol',
    //                     description: 'symbol, eg: (btc, eth, SOL)',
    //                     required: false,
    //                     type: Discord.Constants.ApplicationCommandOptionTypes.STRING
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'bal',
    //             description: 'get the balance of the futures account',
    //             type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND
    //         }
    //     ]
    // })
    // slash.create({
    //     name: 'help',
    //     description: 'Get a list of all the available commands (≧∀≦)ゞ',
    //     options: [
    //         {
    //             name: 'hidden',
    //             description: 'only you can see this message if TRUE',
    //             type: Discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
    //         }
    //     ]
    // })

    // ---------ACTIVITY-----------
    let startTime = Date.now();
    let x = 1;
    let btc,eth,bnb = {};
    let btcdat,ethdat,bnbdat = {};
    setInterval(async () => {
        switch (x) {
            case 1:
                client.user.setActivity("n.help", {
                    type: "LISTENING",
                });
                btc = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`);
                btcdat = await btc.json();
                eth = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`);
                ethdat = await eth.json();
                bnb = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT`);
                bnbdat = await bnb.json();
                x++;
                console.log('Elapsed :',(Date.now() - startTime)/1000,'sec | Status Variable =',true,btcdat);
                break;
            case 2:
                client.user.setActivity(`BTC : ${btcdat.price.slice(0,-6)}`, {
                    type: "WATCHING",
                });
                x++;
                break;
            case 3:
                client.user.setActivity(`ETH : ${ethdat.price.slice(0,-6)}`, {
                    type: "WATCHING",
                });
                x++;
                break;
            case 4:
                client.user.setActivity(`BNB : ${bnbdat.price.slice(0,-6)}`, {
                    type: "WATCHING",
                });
                x = 1;
                break;
        }
    },4000);
}