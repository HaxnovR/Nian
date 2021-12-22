const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const dotenv = require('dotenv').config({path:".env"});

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const token = process.env.TOKEN;
client.dotenv = dotenv;
client.commands = new Collection();

// Event Handler
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

// Not Command Handler!!
// Verifies listed commands
const commands = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commands) {
  const commandName = file.split(".")[0];
  console.log(`Loading ${commandName}`);
}

client.login(token);

//--------------------------------------------OLD----------------------------------------------

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
//   