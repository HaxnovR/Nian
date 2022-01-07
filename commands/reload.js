const bot = require('../bot');

exports.run = (client, message, args) => {
    if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
    const commandName = args[0];
    
    if (null) { // unused
      return message.reply("That command does not exist");
    }
    
    delete require.cache[require.resolve(`./${commandName}.js`)]; 

    message.reply(`The command ${commandName} has been reloaded`);
  };