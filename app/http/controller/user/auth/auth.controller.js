const createHttpError = require("http-errors");
const { PhoneGenerator } = require("../../../../utils/function");
const { UserModel } = require("../../../model/user");
const { RegisterSchema, LoginSchema } = require("../../../validations/user/auth.schema");
const Controller = require("../../controller");
const httpStatus = require("http-status");
const { object } = require("joi");

class UserAuthController extends Controller{
async UserRegister(req,res,next){
try {
await RegisterSchema.validateAsync(req.body);
const{user_name,mobile}=req.body;
const code = PhoneGenerator();
const user = await UserModel.create({user_name,mobile})    
const result = await this.SaveUser(mobile,code,user_name)
if(!result) throw createHttpError.Unauthorized("Registration failed")
return res.status(httpStatus.CREATED).send({
statusCode:httpStatus.CREATED,
data:{
    message:"Send code success",
    code,
    user
}    
})
} catch (error) {
  next(error)  
}    
}
async UserLogin(req,res,next){
try {
await LoginSchema.validateAsync(req.body);
const{mobile,code} = req.body;
const user = await UserModel.findOne({mobile})
if(!user) throw createHttpError.NotFound("User Not Found")
if(user.opt.expiresIN!=code) throw createHttpError.Unauthorized("The sent code is not correct");
const NowDate = Date.now();
if(+user.opt.expiresIN < NowDate) throw createHttpError.Unauthorized("Your code has expired")
user.save();
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
    message:"Login Success",
    user
}    
})    
} catch (error) {
  next(error)  
}    
}
async SaveUser(mobile,code,user_name){
const now = (new Date().getTime())
let otp = {
code,
expiresIN: now + 120000   
}    
const result = await this.UserLogin(mobile)
if(result) {
console.log(result.opt,now);
return (await this.UpdateUser(mobile,{otp}))    
}
return !! (await UserModel.create({mobile,otp,user_name}))
}
async CheckLogin(mobile){
const user = await UserModel.findOne({mobile})
return !! user    
}
async UpdateUser(mobile,objectdate={}){
Object.keys(objectdate).forEach((key) => {
if([""," ",NaN,undefined,0,"0",null].includes(objectdate[key]))   
delete objectdate[key] 
});    
const updateuser= await UserModel.updateOne({mobile},{$set:objectdate})
return !! updateuser.modifiedCount
}
}

module.exports={
    UserAuthController:new UserAuthController()
}