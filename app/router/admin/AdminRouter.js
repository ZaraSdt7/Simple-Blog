const { BlogRouter } = require("./blog");

const router = require("express").Router();
router.use("/blogs",BlogRouter)
module.exports={
    AdminRouters:router
}