exports.run = (client, message, args) => {
    message.channel.messages.fetch({
        limit: args[0] // Change `100` to however many messages you want to fetch
        }).then((messages) => { 
        const botMessages = [];
        messages.filter(m => m.author.id === process.env.BOT_ID).forEach(msg => botMessages.push(msg))
        message.channel.bulkDelete(botMessages).then(() => {
            message.channel.send("Cleared bot messages");
        });
    })
}