const Binance = require('node-binance-api');
const dotenv = require('dotenv').config({path:".env"});
const timestamp = Date.now();
const opts = 'symbol=BTCUSDT';
const binance = new Binance().options({
    APIKEY: process.env.binance_api,
    APISECRET: process.env.binance_key,
  });

var dict = {}


async function getpos(arg) {
    let data = await binance.futuresPositionRisk();
    for(i=0;i<148;i++){
        dict[`${data[i].symbol}`] = i;
    }
    console.log(dict[arg]);
}
let arg = 'ETHUSDT';
getpos(arg);