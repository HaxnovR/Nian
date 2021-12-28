const { DMChannel } = require('discord.js');
let { PythonShell } = require('python-shell');
const logger = require("../clientLogs/logger");

function getchat(data){
    let options = {
        args:[data]
    }

    PythonShell.run("prime.py",options,function(err,results){
        if(err){
          console.log(err);
        }
        else{
        // message.channel.send(results);
        console.log("Successful",results.toString());
        }
    });
}

exports.run = (client, message, args) => {
    var data = message.content;
    console.log("DM DATA:",data);

    let options = {
        args:[data]
    }

    PythonShell.run("commands/py/chat.py",options,function(err,results){
        if(err){
            console.log(err);
        }
        else{
        console.log(results.toString().length);
        console.log(results);
        message.channel.sendTyping();
        if(results.toString().length <= 50){
            setTimeout(()=>{
                message.channel.send(results.toString());
            }, 1000);
        }
        if(results.toString().length > 50 && results.toString().length <= 130){
            setTimeout(()=>{
                message.channel.send(results.toString());
            }, 1600);
        }
        if(results.toString().length > 130 && results.toString().length <= 300){
            setTimeout(()=>{
                message.channel.send(results.toString());
            }, 2900);
        }
        if(results.toString().length > 130){
            logger.info(`Nian reply to dm : '${results.toString()}'`);
        }
        }
    });
}

