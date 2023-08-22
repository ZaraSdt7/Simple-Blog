const router = require("express").Router();
const RedisClient = require("../utils/init-redis");
const { UserAuthRouter } = require("./User/auth.router");
const AdminRouter = require("./admin/AdminRouter");
const { HomeRouter } = require("./api/api.index");

(async()=>{
await RedisClient.set("key","value")
const value = await RedisClient.get("key");
console.log(value);    
})();

router.use("/user",UserAuthRouter);
router.use("/",HomeRouter);
module.exports ={
    AllRouter:router
}