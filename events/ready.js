const logger = require('../clientLogs/logger');
logger.setLevel('all');

module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    logger.info(`------------------------------- NEW INSTANCE ----------------------------------\n
    \t\t\twebSocket Connection successful, Client Logged in at ${new Date().toLocaleTimeString()}
    \t\t\ton channels: ${client.channels.cache.size} | on Servers: ${client.guilds.cache.size} | for Users: ${client.guilds.cache.size}
____________________________________________________________________________________________________________`);
    
    client.user.setStatus("dnd");
    client.user.setActivity("Radio Mirchi 98.3", {
    type: "LISTENING",
  });
  }