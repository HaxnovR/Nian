const jikanjs = require("jikanjs");

const search = async function(type,query) {
	let data = (await jikanjs.search(type,query));
	console.log(data.results[0].url);
}
search("anime","Qualidea");

