const express = require("express");
const {default:mongoose} = require("mongoose");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const swaggerUI = require("swagger-ui-express");
const swaggerjsDoc = require("swagger-jsdoc");
const Cors = require("cors");
const { AllRouter } = require("./router/router");
const createHttpError = require("http-errors");

module.exports = class Application{
#app=express();
#DB_URL;
#PORT;
constructor(DB_URL,PORT){
this.#DB_URL=DB_URL;
this.#PORT=PORT;
this.ConfigApplication();
this.InitRedis();
this.ConnetMongodb(DB_URL);
this.CreateServer(PORT);
this.CreateRouter();
this.ErrorHandeling()
}
ConfigApplication(){
this.#app.use(Cors({origin:"*"}));
this.#app.use(morgan("dev"));
this.#app.use(express.json());
this.#app.use(express.urlencoded({extended:true}));
this.#app.use(express.static(path.join(__dirname,"..","public")));
this.#app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerjsDoc({
swaggerDefinition:{
openapi:"3.0.0",
info:{
title:"Sample-Blog",
version:"2.0.0",
description:"Blog-Project",
contact:{
name:"Zara",
url:"https://github.com/ZahraSdt7",    
}    
},
servers:[
    {
        url:"http://localhost:3000"
    }
],
components:{
securitySchemas:{
    BearerAuth:{
    type:"http",
    schema:"bearer",
    bearerFormat:"JWT"    
    }
}    
},
security:[{BearerAuth:[]}]    
},
apis:["./app/router/**/*.js"]    
}),
{explorer:true}
))   
}    
CreateServer(PORT){
const http = require("http");
http.createServer(this.#app).listen(this.#PORT,()=>{
console.log("Run => http://localhost:" + this.#PORT);    
})    
}
ConnetMongodb(DB_URL){
    main().catch(err => console.log(err));
    async function main() {
        await mongoose.connect(DB_URL)
            .then(() => console.log('Connected to MongoDB.'))
            .catch(err => console.error('Could not Connected to MongoDB.', err));
    }
mongoose.connection.on("Connected",()=>{
 console.log("mongoose connected to db");   
})
mongoose.connection.on("Disconnect",()=>{
console.log("mongoose disconnect to db");    
})
process.on("SIGINT",async()=>{
await mongoose.connection.close();
process.exit(0);    
})
}
InitRedis(){
 require("./utils/init-redis")   
}
CreateRouter(){
this.#app.use(AllRouter)    
}
ErrorHandeling(){
this.#app.use((req,res,next)=>{
next (createHttpError.NotFound("Page Not Found!"))
})    
this.#app.use((error,req,res,next)=>{
const ServerError = createHttpError.InternalServerError();
const StatusCode = error.status || ServerError.status;
const message = error.message || ServerError.message;
return res.status(StatusCode).json({
    errors:{
        StatusCode,
    message
    }
    
})    
})
}

}