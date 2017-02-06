var mongoose = require("mongoose");

var shortenedUrlSchema = mongoose.Schema(
    {
        originalUrl : String,
        shortenedUrl: String
    }
);

module.exports = mongoose.model("ShortenedUrl", shortenedUrlSchema);