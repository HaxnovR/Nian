const logger = require('../clientLogs/logger');
const Discord = require('discord.js');

logger.setLevel('all');

module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    logger.info(`\n\n\n-------------------------------------- NEW INSTANCE ---------------------------------------\n
    \t\t\twebSocket Connection successful, Client Logged in at ${new Date().toLocaleTimeString()}
    \t\t\ton channels: ${client.channels.cache.size} | on Servers: ${client.guilds.cache.size} | for Users: ${client.guilds.cache.size}
____________________________________________________________________________________________________________`);

    client.user.setActivity("Your DMs", {
    type: "LISTENING",
    });

    // Load Slash Commands
    let slash;
    const guild = client.guilds.cache.get('544222557843488778');

    guild.commands.fetch()
  .then(commands => console.log(commands));

    //global
    slash = client.application.commands;
    //development
    nios = guild.commands;
    guild.commands.set([]);
    client.application.commands.set([]);

    slash.create({
        name: 'ping',
        description: 'Pings the bot'
    })
    slash.create({
        name: 'av',
        description: 'Get the avatar of a user',
        options: [
            {
                name: 'user',
                required: true,
                description: 'get avatar of mentioned user',
                type: Discord.Constants.ApplicationCommandOptionTypes.MENTIONABLE
            },
            {
                name: 'hidden',
                required: false,
                description: 'only you can see the message if TRUE',
                type: Discord.Constants.ApplicationCommandOptionTypes.BOOLEAN
            }
        ]
    })
    nios.create({
        name: 'trade',
        description: 'binance futures trading',
        options: [
            {
                name: 'pos',
                description: 'get the balance of the futures account',
                type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                options: [
                    {
                        name: 'symbol',
                        description: 'symbol, eg: (btc, eth, SOL)',
                        required: false,
                        type: Discord.Constants.ApplicationCommandOptionTypes.STRING
                    }
                ]
            },
            {
                name: 'bal',
                description: 'get the balance of the futures account',
                type: Discord.Constants.ApplicationCommandOptionTypes.SUB_COMMAND
            }
        ]
    })
}