const dotenv = require("dotenv").config({path:'.env'});
const { Client, Intents, Collection} = require("discord.js");
const { userInfo } = require("os");
const fs = require("fs");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

//Variables & Constants
const token = process.env.TOKEN;
const master_id = process.env.MASTER;
const prefix = process.env.PREFIX;
var grabbed;

client.dotenv = dotenv;

//get commands
client.commands = new Collection();
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  // Get the command name from splitting the file
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(command.name, command);
}


//get events
const files = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of files) {
  // Split the file and get the event name
  const eventName = file.split(".")[0];
  // Require the file
  const event = require(`./events/${file}`);
  console.log(`Attempting to load Event ${eventName}`);
  client.on(eventName, event.bind(null, client));
}


// client.on("ready", () => {
//   console.log("Online");
//   client.user.setStatus("dnd");
//   client.user.setActivity("Radio Mirchi 98.3", {
//     type: "LISTENING",
//   });
// });


// client.on("messageCreate", (message) => {
//   const args = message.content.slice(prefix.length).trim().split(/ +/g);
//   const command = args.shift().toLowerCase();

//   if (!message.content.startsWith(prefix) || message.author.bot) return;
//   if (command === 'ping') {
//     message.channel.send("pong!");
//   }
//   if (command === 'foo') {
//     message.channel.send("bar!");
//   }
//   if (command === 'echo') {
//     message.delete;
//     message.channel.send(args.join(' '));
    
//   }
//   if (command === 'grab') {
//     grabbed = message.mentions.members.first();
//     message.channel.send(`Grabbed ${grabbed.user.username}#${grabbed.user.discriminator}`);
//   }
//   if (command === 'kill') {
//     console.log(`Kill Sequence Initiated by ${message.author.username}<${message.author.discriminator}>`);
//     if(message.author.id === master_id){
//       message.channel.send("**Kill Request Successful, Shutting Down!**");
//       setTimeout(() => {
//         client.destroy();
//       }, 1000);
//     }
//     else{
//       console.log("Kill Bot Failed");
//       message.channel.send(`Kill Request Failed, Logged author as **${message.author.username}`);
//     }
//   }
//   else{
//     message.reply("Invalid Command!").then(msg => {
//       setTimeout(() => msg.delete(), 10000)
//     })
//   }
// });

client.login(token);