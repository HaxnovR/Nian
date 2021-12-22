const prefix = process.env.PREFIX;

module.exports = (client, message) => {
    // check prefix and botception
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    // standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) {
        message.reply("Invalid Command!").then(msg => {
            setTimeout(() => msg.delete(), 10000)
          })
          console.log(`LOG EVENT:${command},${args}`);
        return;
    };
  
    // Run the command
    console.log(`LOG EVENT:${command},${args}`);
    cmd.run(client, message, args);
  };