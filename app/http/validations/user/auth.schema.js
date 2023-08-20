const joi = require("@hapi/joi")
const RegisterSchema = joi.object({
user_name:joi.string().min(4).max(7).required(),
mobile:joi.string().length(11).pattern(/^09[0-9]{9}$/).trim().required().error(new Error("Invalid phone number!"))    
})

const LoginSchema = joi.object({
mobile:joi.string().length(11).pattern(/^09[0-9]{9}$/).trim().required().error(new Error("Invalid phone number!")),
code:joi.string().min(4).max(6).error(new Error("Invalid  send Code"))    
})
module.exports={
    RegisterSchema,
    LoginSchema
}