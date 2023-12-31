const joi = require("@hapi/joi");
const BlogSchema = joi.object({
title:joi.string().error(new Error("The title is incorrect")),
text:joi.string().error(new Error("The text is incorrect")),
author:joi.string().error(new Error("Author name incorrect")),
category:joi.string().error(new Error("The category is incorrect")),
filename:joi.string().pattern(/(\.png|\.jpg|\.jpeg|\.webp|\.gif)$/).error(new Error("The image sent is not correct")),
fileUploadPath:joi.allow()    
})
module.exports={
    BlogSchema
}