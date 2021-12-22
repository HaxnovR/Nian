exports.run = (client, message, args) => {
    message.channel.send("temp dm msg").catch(console.error);
}