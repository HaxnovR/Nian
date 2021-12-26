const fetch = require('node-fetch');
let url = "https://aws.random.cat/meow";

async function fetchText() {
    let response = await fetch(url);
    let data = await response.json();
    console.log("async",data.file);
}
fetchText();