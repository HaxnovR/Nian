const { Client, Intents } = require("discord.js");
const Discord = require('discord.js');
const fs = require("fs");
const dotenv = require('dotenv').config({path:".env"});
const logger = require('./clientLogs/logger')


const client = new Client({
  partials: ["CHANNEL"],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  ws: { properties: { $browser: "Discord iOS" }}
});

const help_footer = {
  text:"To get list of all commands use n.help",
}

// holds all available commands
const calls = ['help','ping','echo','kill','reload','clear','mau',
              'urlsh','dog','duck','uwu','owo','mal','crypto','upload',
              'spotify','trade','av'];
const slashCalls = ['av','ping','trade'];
const token = process.env.TOKEN;
client.dotenv = dotenv;
client.calls = calls;
client.slashCalls = slashCalls;
client.logger = logger;
client.help_footer = help_footer;

// Event Handler
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
for (const file of events) {
  const eventName = file.split(".")[0];
  const event = require(`./events/${file}`);
  client.on(eventName, event.bind(null, client));
}

// Not Command Handler!!
// Verifies listed command files
const command = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of command) {
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