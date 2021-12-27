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
        // console.log("Successful",results.toString());
        message.channel.send(results.toString());
        logger.info(`Nian reply to dm : '${results.toString()}'`);
        }
    });
}

