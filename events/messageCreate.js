const prefix = process.env.PREFIX;

module.exports = (client, message) => {

  // Ignore all bots and non-prefix messages
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'ping'){
    let cmd = require(`../commands/${command}`);
    cmd.run(client, message, args);
    return;
  }
  if(command === 'echo'){
    let cmd = require(`../commands/${command}`);
    cmd.run(client, message, args);
    return
  }
  if(command === 'target'){
    let cmd = require(`../commands/${command}`);
    cmd.run(client, message, args);
    return
  }
  if(command === 'kill'){
    let cmd = require(`../commands/${command}`);
    cmd.run(client, message, args);
    return
  }
  else{
    message.reply("Invalid Command!").then(msg => {
      setTimeout(() => msg.delete(), 10000)
    })
  }
  
};