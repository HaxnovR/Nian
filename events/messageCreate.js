const { channel } = require("diagnostics_channel");

const prefix = process.env.PREFIX;
const self_id = process.env.BOT_ID;

module.exports = (client, message) => {
  if(message.author.bot)return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(message.guild===null){
    let cmd = require(`../dm`);
    cmd.run(client, message, args);
    console.log("DM detected:",message.content);
    return;
  }
  // Ignore all bots and non-prefix messages
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if(client.calls.includes(command)){
    let cmd = require(`../commands/${command}`);
    cmd.run(client, message, args);
    return;
  }
  else{
    message.reply("Invalid Command!").then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
  }
  
};