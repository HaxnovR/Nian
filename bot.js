const { Client, Intents } = require("discord.js");
const Discord = require('discord.js');
const fs = require("fs");
const dotenv = require('dotenv').config({path:".env"});
const logger = require('./clientLogs/logger')

// Switch application between Development and Production mode
const mode = 'prod' // prod or dev

const client = new Client({
  partials: ["CHANNEL"],
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
  ws: { properties: { $browser: "Discord iOS" }}
});

const help_footer = {
  text:"To get list of all commands use n.help",
}

// holds all available commands
const help = {
  fieldImages : `\`dog\` - get an image of a random Dog
\`duck\` - get an image of a random duck
\`mau\` - get an image of a random cat
\`uwu\` - get a random anime image eg: \`uwu hug\`
`,
  fieldUtil : `\`av\` - get an user's avatar
\`clear\` - clear previous bot chats
\`crypto\` - get the latest price for a cryptocurrency
\`mal\` - get data from MyAnimeList
\`spotify\` - get data from Spotify
\`upload\` - upload an image to imgur and get its link
\`urlsh\` - shorten an URL
`,
  fieldNSFW : "`owo`"
}
const calls = ['help','ping','echo','kill','reload','clear','mau',
              'urlsh','dog','duck','uwu','owo','mal','crypto','upload',
              'spotify','trade','av'];
const slashCalls = ['help','av','ping','trade'];
client.mode = mode;
client.help = help;
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

let token = ''
if(mode == 'prod' ? token = process.env.TOKEN : token = process.env.TOKEN2);

client.login(token);

//--------------------------------------------OLD----------------------------------------------

// .env stores:
// |api
// |TOKEN
// |MASTER
// |BOT_ID
// |PREFIX
// |spotify