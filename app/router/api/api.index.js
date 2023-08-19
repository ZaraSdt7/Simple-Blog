const homecontroller = require("../../http/controller/api/homecontroller");

const router = require("express").Router();
router.get("/",homecontroller.IndexPage)
module.exports={
    HomeRouter:router
}