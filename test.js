const fetch = require("node-fetch");

async function getSearch(){
    var qry = 'Travis Scott';
    var query = encodeURIComponent(qry.trim())
    console.log(query);
    let response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=ES&limit=4&offset=0`, {
        method: 'GET',headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer BQCU3Es6S206s6rEUhPX6zC6hbXzbClTvgssGy9K76B7K4RRixhzcoT5oeO6Sbss66_E4NlpcMfhYuoX0SCQGocaIG0SDTDrBuEu4wZj5VY7ioxgKqadP4qtoDRrlhiibNvi-GXsp30-oGmUeqot5Na4HM-8Fj_VGWA`
        }
    });
    let data = await response.json();
	console.log(data);
    
}
getSearch();