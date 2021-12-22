module.exports = (client, message) => {
    const prefix = process.env.PREFIX;
    // Ignore all bots
    if (message.author.bot) return;
  
    // Ignore messages not starting with the prefix (in config.json)
    if (!message.content.startsWith(prefix)) return;
  
    // Our standard argument/command name definition.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) {
        message.reply("Invalid Command!").then(msg => {
            setTimeout(() => msg.delete(), 10000);
          })
          console.log(`INVALID LOG EVENT:--->${command}--->${args}--->${cmd}`);
        return;
    };
  
    // Run the command
    console.log(`LOG EVENT:--->${command}--->${args}--->${cmd}`);
    cmd.run(client, message, args);
  };