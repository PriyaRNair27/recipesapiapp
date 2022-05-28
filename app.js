const Express=require("express")
const Mongoose=require("mongoose")
const Bodyparser=require("body-parser")
var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });
    var recipemodel=Mongoose.model("recipes",
new Mongoose.Schema({
recipetitle:String,
category:String,
description:String,
preparedby:String

}))
Mongoose.connect("mongodb+srv://mzcbook:807826@cluster0.2sbk9.mongodb.net/recipeDb")
app.post("/api/recipedelete",(req,res)=>{
    var getId=req.body
    recipemodel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
})
app.post("/api/recipesearch",(req,res)=>{
var getrecipetitle=req.body
recipemodel.find(getrecipetitle,(error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else
    {
      res.send({"status":"success","data":data})
    }
})
})



app.post("/api/recipeapp",(req,res)=>{
    var data=req.body
    let recipe=new recipemodel(data)
    recipe.save((error,data)=>{
        if(error)
        {
            res.send({"status":"error","data":error})
        }
        else
        {
          res.send({"status":"success","data":data})
        }
    })
})
app.get("/api/recipeview",(req,res)=>{
    recipemodel.find(
        (error,data)=>{
            if(error)
     {
         res.send({"status":"error","data":error})
     }
     else
     {
         res.send({"status":"success","data":data})
     }

            
        }
    )
   
})
app.listen(4000,()=>{
    console.log("server running")
})