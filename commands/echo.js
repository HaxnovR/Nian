exports.run = (client, message, args) => {
    message.channel.send(args.join(' '));
}