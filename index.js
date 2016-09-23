var express = require('express')
var app = express()
var plivo = require('plivo');

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.set({
      'Content-Type': 'text/xml'
  });

  conf(response);


})


function conf(response){
  var r = plivo.Response(response);

  var params = {
      'enterSound' : "beep:2", // Used to play a sound when a member enters the conference
      'record' : "true", // Option to record the call
  };

  var conference_name = "demo"; // Conference Room name
  r.addRecord();
  response.end(r.toXML());
}
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
