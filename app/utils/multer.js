const multer = require("multer");
const fs = require("fs");
const path = require("path");
const createHttpError = require("http-errors");
function Createmulter(req){
const date = new Date();
const year = date.getFullYear().toString();
const month = date.getMonth().toString();
const day = date.getDate().toString();
const directory = path.join(__dirname,"..","..","public","uploads","blog",year,month,day)
req.body.fileUploadPath = path.join("uploads","blog",year,month,day)
fs.mkdirSync(directory,{recursive:true})
return directory 
}
const storage=multer.diskStorage({
destination:(req,file,cb)=>{
if(file?.originalname){
const filepath = Createmulter(req) 
return cb(null,filepath)   
}
cb(null,null)
},
filename:(req,file,cb)=>{
if(file.originalname){
const ext = path.extname(file.originalname);
const FileName = String(new Date().getTime() + ext) 
req.body.filename = FileName
return cb(null,true)   
}
cb(null,null)
}    
})
function FileFilter(req,file,cb){
const ext = path.extname(file.originalname);
const ImageType = [".jpg",".jpeg",".gif",".webp",".png"];
if(ImageType.includes(ext)){
cb(null,true)    
} 
return cb(createHttpError.BadRequest(" The image format  send is incorrect"))   
}
const Sizeimage = 1*1000*1000;
const UploadFile=multer({storage,FileFilter,limits:({fieldSize:Sizeimage})})

module.exports={
    UploadFile
}