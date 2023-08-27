const path = require("path");
const fs = require("fs")
function PhoneGenerator(){
return Math.floor(Math.random()*90000+10000)    
}
function DeleteFileInPulic(FileAddress){
if(FileAddress){
const Filepath = path.join(__dirname,"..","..","public",FileAddress)
if(fs.existsSync(Filepath)) fs.unlinkSync(Filepath)   
}    
}

module.exports={
    PhoneGenerator,
    DeleteFileInPulic
}