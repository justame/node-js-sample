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


function conf(){
  var r = plivo.Response(response);

  r.addSpeak("You will now be placed");
  var params = {
      'enterSound' : "beep:2", // Used to play a sound when a member enters the conference
      'record' : "true", // Option to record the call
      'action' : "https://intense-brook-8241.herokuapp.com/conf_action/", // URL to which the API can send back parameters
      'method' : "GET", // method to invoke the action Url
      'callbackUrl' : "https://intense-brook-8241.herokuapp.com/conf_callback/", // If specified, information is sent back to this URL
      'callbackMethod' : "GET", // Method used to notify callbackUrl
      // For moderated conference
      'startConferenceOnEnter' : "true", // When a member joins the conference with this attribute set to true, the conference is started.
                                         // If a member joins a conference that has not yet started, with this attribute value set to false,
                                         // the member is muted and hears background music until another member joins the conference
      'endConferenceOnExit' : "true" // If a member with this attribute set to true leaves the conference, the conference ends and all
                                     // other members are automatically removed from the conference.
  };

  var conference_name = "demo"; // Conference Room name
  r.addConference(conference_name, params);
  response.end(r.toXML());
}
