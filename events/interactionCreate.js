const fs = require('fs');

module.exports = async (client, interaction) => {
    const slashCalls = client.slashCalls;

    if(!interaction.isCommand()){
        return;
    }
    const { commandName , options } = interaction;

    const command = fs.readdirSync("./commands/slashCommands").filter(file => file.endsWith(".js"));
    
    if(slashCalls.includes(commandName)){
        let cmd = require(`../commands/slashCommands/${commandName}`);
        cmd.run(client,interaction,options);
    }
    else{
        return
    }
}