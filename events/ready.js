module.exports = (client) => {
    console.log(`Ready to serve in ${client.channels.cache.size} channels on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users.`);
    client.user.setStatus("dnd");
    client.user.setActivity("Radio Mirchi 98.3", {
    type: "LISTENING",
  });
  }