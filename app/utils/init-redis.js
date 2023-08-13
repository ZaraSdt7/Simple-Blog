const { log } = require("console");
const RedisDB = require("redis");
const RedisClient = RedisDB.createClient();
RedisClient.connect();
RedisClient.on("connet",()=> console.log("connect redis"))
RedisClient.on("Ready",()=> console.log("connect  ready to redis"));
RedisClient.on("Error",(err)=> console.log("redis error:", err.message));
RedisClient.on("end",()=> console.log("disconnect redis"));
module.exports = RedisClient