var reponce = require("./respond.js");


module.exports = function(app,elasticsearch){

  app.post('/ChatFuel/UserData',function(req,res){
    var obj = req.body
        elasticsearch.index({
      index: "ChatFuel",
      type: 'UsersData',
      body: obj
    }, function (error, response) {
        if(error){
          console.log(error);
        }
        else{console.log(responce);}
    });
  });

  app.get('/ChatFuel/UserData',function(req,res){
        elasticsearch.search({
      "index": 'ChatFuel',
      "type": 'UsersData'
    }).then(function (resp) {
        var hits = resp.hits.hits;
        res.send(JSON.stringify(hits),status);
    }, function (err) {
        res.respond(404);
    });
  });
}
