const { BlogController } = require("../../http/controller/admin/Blog/blog");
const { UploadFile } = require("../../utils/multer");

const router = require("express").Router();
router.get("/",BlogController.GetListOfBlog)
router.post("/add",UploadFile.single("image"),BlogController.CreateBlog)
router.patch("/update/:id",UploadFile.single("image"),BlogController.UpdateBlogByID)
router.get("/:id",BlogController.GetOneByID)
router.delete("/:id",BlogController.RemoveBlogByID)
module.exports={
    BlogRouter:router
}