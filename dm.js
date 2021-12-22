
exports.run = (client, message, args) => {
    var data = message.content;
    console.log("DATA:",data);

    var spawn = require('child_process').spawn,
    py    = spawn('python', ['chat.py']),
    dataString = '';

    py.stdout.on('data', function(data){
        dataString += data.toString();
        console.log("OUT:",dataString);
    });
    py.stdout.on('end', function(){
        message.channel.send(dataString).catch(console.error);
    });
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
}

