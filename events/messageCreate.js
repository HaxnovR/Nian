const { channel } = require("diagnostics_channel");

const self_id = process.env.BOT_ID;
const logger = require('../clientLogs/logger');

module.exports = (client, message) => {
	if(client.mode === 'dev' ? prefix = '.' : prefix = 'n.')
	if(message.author.bot)return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if(message.guild===null && !message.author.bot){
		let cmd = require(`../commands/dm`);
		cmd.run(client, message, args);
    logger.info(`DM Request ${message.author.username}#${message.author.discriminator} : '${message.content}'`);
    return;
  }
  // Ignore all bots and non-prefix messages
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  
  if(client.calls.includes(command)){
    let cmd = require(`../commands/${command}`);
    cmd.run(client, message, args);
    logger.info(`Command Request - : ${command} by ${message.author.username}#${message.author.discriminator}`);
    return;
  }
  else{
	  message.reply("Invalid Command!").then(msg => {
		  setTimeout(() => msg.delete(), 10000)
		  logger.warn(`Failed Command - (Reason)Invalid Command : ${command} {args}:${args}`);
		})
	}
	return;
};