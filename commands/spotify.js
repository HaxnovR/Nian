const fetch = require('node-fetch');
const { ImgurClient } = require('imgur');
const dotenv = require('dotenv').config({path:"../.env"});

exports.run = (client, message, args) => {
    async function getSearch(){
        let qry = (args.join(' '));
        var query = encodeURIComponent(qry.trim())
        let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=ES&limit=4&offset=0`, {
            method: 'GET',headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.spotify}`
            }
        });
        let data = await response.json();
        const embed = new MessageEmbed()
  			.setColor("1DB954")
  			.setAuthor(`Requested by ${message.author.username}${message.author.discriminator}`,message.author.displayAvatarURL())
  			.setTitle(`Results for ${qry}`)
  			.setThumbnail(data.results[0].image_url)
			// Fields --->
  			.addField(data.tracks[0].title,`\[[${data.tracks[0].mal_id}](${data.tracks.items[0].external_urls.spotify})`)
  			.addField(data.tracks[1].title,`\[[${data.tracks[1].mal_id}](${data.tracks.items[1].external_urls.spotify})`)
			.addField(data.tracks[2].title,`\[[${data.tracks[2].mal_id}](${data.tracks.items[2].external_urls.spotify})`)
			.addField(data.tracks[3].title,`\[[${data.tracks[3].mal_id}](${data.tracks.items[3].external_urls.spotify})`)
  			
  			.setTimestamp()
  			.setFooter("Data from Spotify", "https://upload.wikimedia.org/wikipedia/commons/7/7a/MyAnimeList_Logo.png");
  			
  			message.channel.send({ embeds: [embed] });
		}
	    console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));
        console.log(JSON.stringify(data.tracks.items[1].external_urls.spotify, null, 2));
        console.log(JSON.stringify(data.tracks.items[2].external_urls.spotify, null, 2));
        console.log(JSON.stringify(data.tracks.items[3].external_urls.spotify, null, 2));  
    }
    getSearch();
}