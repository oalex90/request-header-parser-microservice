// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get("/api/whoami", function (req, res) {
  var ipAddress = req.headers['x-forwarded-for'].split(',')[0];
  var language = req.headers['accept-language'];
  console.log("acceptslanguages", req.headers['accept-language']);
  var regExp = /\(([^)]+)\)/; //reg exp to attact "(...)" from string
  //var userAgent = regExp.exec(req.headers['user-agent'])[0] //exectue reg exp and get first instance
  console.log("user-agent", req.headers['user-agent']);
  var software = req.headers['user-agent'];

  res.json({ipaddress: ipAddress, language: language, software: software});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
