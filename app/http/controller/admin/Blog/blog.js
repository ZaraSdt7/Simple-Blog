const { BlogSchema } = require("../../../validations/admin/blog.schema");
const path = require("path");
const Controller = require("../../controller");
const { BlogModel } = require("../../../model/blog");
const httpStatus = require("http-status");
const { DeleteFileInPulic } = require("../../../../utils/function");
const blog = require("../../../model/blog");
const createHttpError = require("http-errors");
const { required } = require("joi");

class BlogControllet extends Controller{
async CreateBlog(req,res,next){
try {
const Blogschemas = await BlogSchema.validateAsync(req.body);
req.body.image = path.join(Blogschemas.fileUploadPath,Blogschemas.filename)
req.body.image = req.body.image.replace(/\\/g,"/") 
const {title,text,category}= Blogschemas;
const image = req.body.image
const author = user._id;
const CreateBlog = await BlogModel.create({title,text,author,category,image})
return res.status(httpStatus.CREATED).json({
statusCode:httpStatus.CREATED,
data:{
  message:"Blog created successfully",
  CreateBlog
}  
})
} catch (error) {
  DeleteFileInPulic(req.body.image)
  next(error)  
}    
}    

async GetListOfBlog(req,res,next){
try {
const blog = await BlogModel.aggregate([
  {
    $match: {}
  },
  {
    $lookup:{
      from:"user",
      foreignField:"_id",
      localField:"autor",
      as:"author"
    }
  },
  {
    $unwind:"auhor"
  },
  {
    $project:{
      "autor.__v":0,
      "author.opt":0
    }
  }

])    
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
blog  
}  
})

} catch (error) {
  next(error)  
}    
}
async GetOneByID(req,res,next){
try {
const {id} = req.params;
const Getid = await this.FindBlogByID(id);
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
  Getid
}  
})    
} catch (error) {
  next(error)  
}    
}

async RemoveBlogByID(req,res,next){
try {
const {id} = req.params;
await this.FindBlogByID(id);
const Removeblog = await BlogModel.deleteOne({_id:id});
if(Removeblog.deletedCount == 0) throw createHttpError.InternalServerError(" Blog not deleted")
return res.status(httpStatus.OK).json({
statusCode:httpStatus.OK,
data:{
  message:"Deleted log in successfully"
}  
})    
} catch (error) {
  next(error)  
}    
}

async UpdateBlogByID(req,res,next){
try {
const { id} = req.params;
await this.FindBlogByID(id);
if(req?.body?.fileUploadPath && req?.body?.filename){
  req.body.image = path.join(req.body.fileUploadPath,req.body.filename);
  req.body.image = req.body.image.replace(/\\/g,"/");
}     
const data = req.body;
let NullData = [null,undefined,""," ",0,"0"];
Object.keys(data).forEach(key=>{{
if(NullData.includes(key)) delete data[key]
if(typeof data[key] == "string") data[key] = data[key].trim();
if(Array.isArray(data[key]) && data[key].length >0) data[key]= data[key].map(item=>item.trim()) 
}})
const updateblog = await BlogModel.updateOne({_id:id},{$set:data})
if (updateblog.modifiedCount == 0) throw createHttpError.InternalServerError("Update blog failed")
return res.status(httpStatus.OK).json({
  statusCode:httpStatus.OK,
  data:{
    message:"Update Blog successfully"
  }
})
} catch (error) {
  DeleteFileInPulic(req?.body?.image)
  next(error)  
}    
}

async FindBlogByID(id){
const findid = await BlogModel.findById(id).populate([{path:"author", select:['user_name','mobile']}])
if(!findid) throw createHttpError.NotFound("Blog not found");
return findid
}
}
module.exports={
    BlogControllet:new BlogControllet()
}