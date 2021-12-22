exports.run = (client, message, args) => {
    let master_id = process.env.MASTER;
    console.log(`Kill Sequence Initiated by ${message.author.username}<${message.author.discriminator}>`);
    if(message.author.id === master_id){
      message.channel.send("**Kill Request Successful, Shutting Down!**");
      setTimeout(() => {
        client.destroy();
      }, 1000);
    }
    else{
      console.log("Kill Bot Failed");
      message.channel.send(`Unauthenticated kill command, Logged author as **${message.author.username}`);
    }
}