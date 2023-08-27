const { BlogRouter } = require("./blog");

const router = require("express").Router();
router.use("/blog",BlogRouter)
module.exports={
    AdminRouters:router
}