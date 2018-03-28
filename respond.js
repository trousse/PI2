var http = require('http');

http.ServerResponse.prototype.respond = function(content,status){

    if(typeof(status) == "undefined"){
        if(typeof(content) == "number"){
           status = content;
           content = undefined;
        }
        else{
          status = 200;
        }
    }

    if(status != 200){

      content = {
        "code" : status,
        "status" : http.STATUS_CODES[status],
        "message" : content.toString()

      };
    }

     if (typeof(content) != "object"){

      var result = {"message":[]}
       switch(content.type){
        case 'text':
          result.message.push({"text" : content.data});
          break;
        case 'image':
        case 'video':
        case 'audio':
        case 'file':
          result.message.push({
            "attachment":{
              "type": content.type,
              "payload":{
                "url": content.data
              }
            }
          });
          break;
        default:
        content = {
          "code" : 404,
          "status" : http.STATUS_CODES[404],
          "message" : "not found"
        };

            }
     }

     this.send(JSON.stringify(content)+'\n',status);


}
