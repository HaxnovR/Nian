const bot = require('../bot');

exports.run = (client, message, args) => {
    if(message.author.id!=process.env.MASTER){
      return;
    }

    if (!args || args.length < 1){
      message.reply("Must provide a command name to reload.");
      return;
    }
    const commandName = args[0];
    
    if (!client.calls.includes(commandName)) {
      message.reply("That command does not exist");
      return;
    }
    
    delete require.cache[require.resolve(`./${commandName}.js`)]; 

    message.reply(`The command ${commandName} has been reloaded`);
  };