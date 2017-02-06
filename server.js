var express = require("express"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    path = require("path"),
    app = express(),
    port = process.env.PORT || 8000;

    mongoose.connect("mongodb://localhost/url_shortener_microservice");

    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname+'/index.html'))
    });

    app.get("/new/:url", function(req, res){
        
    });

    app.listen(port, function(){
        console.log("Server is listening on port "+ port);
    });