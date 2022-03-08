const logger = require('../clientLogs/logger');

exports.run = (client, message, args) => {
    slash = client.slash;
    message.channel.send('**Pinging...**').then (async (msg) =>{
        msg.delete();
        message.channel.send(`Latency is **${msg.createdTimestamp - message.createdTimestamp}ms**`);
        logger.debug(`Latency is '${msg.createdTimestamp - message.createdTimestamp}ms'. API Latency is ${Math.round(client.ws.ping)}ms`);
    })   
}