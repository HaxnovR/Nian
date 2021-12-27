const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const dotenv = require('dotenv').config({path:".env"});
const logger = require('./clientLogs/logger')


const client = new Client({
  partials: ["CHANNEL"],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]
});

// holds all available commands
const calls = ['ping','echo','target','kill','reload','clear','mau'];
const token = process.env.TOKEN;
client.dotenv = dotenv;
client.commands = new Collection();
client.calls = calls;
client.logger = logger;

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

// .env stores:
// |api
// |TOKEN
// |MASTER
// |BOT_ID
// |PREFIX
// |spotify