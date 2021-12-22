var spawn = require('child_process').spawn,
    py    = spawn('python', ['chat.py']),
    data = 'hello',
    dataString = '';

py.stdout.on('data', function(data){
  dataString += data.toString();
});
py.stdout.on('end', function(){
  console.log(dataString);
});
py.stdin.write(JSON.stringify(data));
py.stdin.end();