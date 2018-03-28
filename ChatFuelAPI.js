var reponce = require("respond.js");

module.exports = function(app,redisClient){
      app.get("/ChatFuel/:Attribut",function(req,res){

        redisClient.getAsync(req.params.Attribut).then(function(content) {
          res.respond(JSON.parse(content),200);
    });

      app.post("/Chatfuel/Attribut",function(req,res){

        var obj = {
          "type": req.body.type,
          "data" : req.body.data
        }
        redisClient.set( req.body.Name, JSON.stringify(obj) , redisClient.print);
        res.respond(200);
    });
  });
}
