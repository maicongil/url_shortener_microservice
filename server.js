var express = require("express"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    path = require("path"),
    app = express(),
    port = process.env.PORT || 8000,
    ShortenedUrl = require("./models/shortened_url.js");

mongoose.connect("mongodb://localhost/url_shortener_microservice");

app.use(morgan("combined"));

function getRandom(){
    return  Math.floor(Math.random() * 10000).toString();
}

//index page
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname+'/index.html'))
});

app.get("/:url", function(req, res){
    //search shortened url in db
    ShortenedUrl.findOne({shortenedUrl : req.params.url}, function(error, foundUrl){
        if(error){
            res.send(error);
        }else{
            if(foundUrl){
                //if found, redirect to original url
                res.redirect(foundUrl.originalUrl);
            }else{
                //if not found, send an message url not found
                res.send({"error": "URL not found"});
            }
        }
    });
});

app.get("/new/*", function(req, res){
    
    var url = new ShortenedUrl({
        originalUrl : req.params[0]
    });

    //validate url format
    if(url.originalUrl.match(/^((https?|ftp):\/\/)?([\da-z\-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)){
        ShortenedUrl.findOne({originalUrl : url.originalUrl}, function(error, foundUrl){
            if(error){
               console.log(error);
            }else{
                //if exists, don't create a new shortned ulr, just return
                if(foundUrl){ 
                     res.send({"originalUrl" : foundUrl.originalUrl, "shortenedUrl" : foundUrl.shortenedUrl});
                }else{
                    url.shortenedUrl = getRandom();
                    url.save( function(error, insertedUrl){
                        if(error){
                            console.log(error);
                        }else{
                            res.send({"originalUrl" : insertedUrl.originalUrl, "shortenedUrl" : insertedUrl.shortenedUrl});
                        } 
                    });
                }
            }
         });
    //invalid url         
    }else{
        res.send({"error":"The URL is invalid."});
    }
});

//404
app.get("*", function(req, res){
    res.status(404).send("Opsss... not found!")
});

app.listen(port, function(){
    console.log("Server is listening on port "+ port);
});