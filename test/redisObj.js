const redis = require("redis")

const cli = redis.createClient("6379","localhost") 

console.log(cli)