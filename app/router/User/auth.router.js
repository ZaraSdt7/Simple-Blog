const { UserAuthController } = require("../../http/controller/user/auth/auth.controller");

const router = require("express").Router();
router.post("/register",UserAuthController.UserRegister);
router.post("/login",UserAuthController.UserLogin)
module.exports={
    UserAuthRouter:router
}