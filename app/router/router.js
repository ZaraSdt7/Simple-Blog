const RedisClient = require("../utils/init-redis");

(async()=>{
await RedisClient.set("key","value")
const value = await RedisClient.get("key");
console.log(value);    
})();

const router = require("express").Router();
module.exports ={
    AllRouter:router
}