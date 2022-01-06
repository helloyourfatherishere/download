// var fs= require("fs")
// var download= require("download")

// var d =async function(){
//     try{
//         console.log("ABV")  

//         let link= "https://media.gettyimages.com/photos/the-painter-hands-picture-id1190200652?s=2048x2048"
//          download(link ,"file").then((f)=>{
//             console.log(f)
//              console.log("done")
//          }).catch((e)=>{console.log(e)})
        
//         }
//     catch{
//         (e)=>{console.log(e)}
//     }
// };
// d();

// const avd = require("all-video-downloader");

// var a= async function(){
//     try{
//             var link="";
//             const info_with_option_urls = avd(link).then((result) => {
//                 console.log(result);
//             }).catch((e)=>{console.log(e)})
//     }
//     catch{
//         (e)=>{console.log(e)}
//     }
// }
// a()

var express= require("express");
var app= express();
var port= process.env.PORT || 1000
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser= require("body-parser"); 
const avd = require("video-downloader-pro");
var fs= require("fs")
var download= require("download")
var hbs=require("hbs")
var public_path= path.join(__dirname,"/public/")
var views_path= path.join(__dirname,"/public/views")
var partials_path= path.join(__dirname,"/public/partials")
require("dotenv").config();
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.set("view engine", "hbs")
app.set("views", views_path)
hbs.registerPartials(partials_path)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/images",(req,res)=>{
    res.render("images")
})

app.get("/videos",(req,res)=>{
    res.render("videos")
})

app.post("/videos",(req,res)=>{
    var value= `${req.body.value.toString()}`
    console.log(value)
        var v= async function(){
        try{
                var link=value;
                let data = await avd(link).then((result) => {
                    console.log(result)
                    if(result==undefined){
                        return({type:false,data:result})
                    }
                    else{
                        return({type:true,data:result})

                    }
                }).catch((e)=>{
                    console.log(e)
                    return({type:false,data:e.message})
                })
                console.log(data)
                res.render("videos",{data:data})
        }
        catch{
            (e)=>{console.log(e)}
        }
        }
        v()
})

app.post("/images",(req,res)=>{
    var value= `${req.body.value.toString()}`
    console.log(value)
    var i =async function(){
        try{
            let link= value
             download(link).then((f)=>{
                console.log(f)
                res.send(f)
                 console.log("done")
             }).catch((e)=>{console.log(e)})
            
            }
        catch{
            (e)=>{console.log(e)}
        }
            };
            i();
})



app.listen(port,()=>{
    console.log(`connected at port no ${port}`)
})