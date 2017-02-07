var GenerateShortUrl = (function () {

    var randomInt = function(){
        return  Math.floor(Math.random() * 1000).toString();
    }

    var generateRandomIntUrl = function(){
        return randomInt();
    }
    
    return {
        generateRandomIntUrl: generateRandomIntUrl
    };

})();

module.exports = GenerateShortUrl;