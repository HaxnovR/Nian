const fetch = require('node-fetch');
const { ImgurClient } = require('imgur');
const dotenv = require('dotenv').config({path:"../.env"});

exports.run = (client, message, args) => {
    async function getUpload(){
        if (message.attachments.size > 0) {
            let attachments = message.attachments;
            // TO MP4
            if(args[0]=="tomp4"){
                for (let file of attachments) {
                    if(file[1].url.slice(-3)=="gif"){
                        const imgclient = new ImgurClient({ clientId: process.env.IMGUR });
                        let response = await imgclient.upload({
                            image: file[1].proxyURL,
                        });
                        message.channel.send(`**Uploaded** at <${response[0].data.mp4}>`);
                    }
                    else{
                        message.channel.send("Provide a **.gif** File");
                        return;
                    }
                }
            }
            else{
                for(let file of attachments) {
                    const imgclient = new ImgurClient({ clientId: process.env.IMGUR });
                    let response = await imgclient.upload({
                        image: file[1].proxyURL,
                    });
                    message.channel.send(`**Uploaded** at <${response[0].data.link}>`);
                }
            }
            
        }
        else{
            message.reply("Please provide an Image");
        } 
    }
    getUpload();
}