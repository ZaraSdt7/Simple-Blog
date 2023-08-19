const Controller = require("../controller");

module.exports = new class HomeController extends Controller{
async IndexPage(req,res,next){
try {
    return res.status(200).send("Home Page Blog")
} catch (error) {
  next(error)  
}    
}    
}();