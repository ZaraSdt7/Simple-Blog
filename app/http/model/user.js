const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
user_name:{type:String,required:true,unique:true},
mobile:{type:String,required:true,unique:true},
opt:{type:Object,default:{code:0,expiresIN:0}}    
},{
timestamps:true,
toJSON:{
    virtuals:true
}
});
UserSchema.index({user_name:"text",mobile:"text"})
module.exports={
    UserModel:mongoose.model("user",UserSchema)
}



