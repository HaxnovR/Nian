const dotenv = require("dotenv").config({path:'.env'});
const { Client, Intents, Collection} = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

//Variables & Constants
const token = process.env.TOKEN;

client.dotenv = dotenv;
client.commands = new Collection();


//get events
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}


//get commands
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  const command = require(`./commands/${file}`);

  console.log(`Attempting to load command ${commandName}`);
  client.commands.set(command.name, command);
}

client.login(token);


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
// })