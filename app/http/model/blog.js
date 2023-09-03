const { default: mongoose } = require("mongoose");

const BlogSchema = new mongoose.Schema({
title:{type:String,required:true},
text:{type:String,required:true},
author:{type:String,required:true},
image:{type:String,required:true},
category:{type:String,required:true},
},{
    timestamps:true,
    versionKey:false,
    toJSON:{
        virtuals:true
    }   
})
// BlogSchema.virtual("user",{
// ref:"user",
// localField:"_id",
// foreignField:"author"    
// })
BlogSchema.virtual("imageURL").get(function(){
return `${process.env.BASE_URL}:${process.env.APPLICATION_PORT}/${this.image}`    
})
module.exports={
    BlogModel:mongoose.model("blog",BlogSchema)
}