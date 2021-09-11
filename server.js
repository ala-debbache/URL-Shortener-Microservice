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


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let reqDateString = req.params.date_string
  let reqDateStringIsStringType = false;
  if(reqDateString !== undefined ) {
    reqDateStringIsStringType = reqDateString.includes("-")
  }
  if(reqDateString === undefined ) {
    reqDateString = new Date();
  }
  //console.log("reqDateStringIsStringType is true",reqDateStringIsStringType)
  if(reqDateStringIsStringType === false ) {
    reqDateString = Number(reqDateString)
  }
  //console.log("type of reqDateString ",typeof(reqDateString))
  const date = new Date(reqDateString)
  const unixDate = date.getTime();
  const utcDate = date.toUTCString();
  //console.log("here is the date", date);
  if( utcDate === "Invalid Date") {
    res.send({
      "error" : "Invalid Date"
    })
  }
  res.send({
    "unix" : unixDate,  
    "utc" : utcDate
  });
})


//process.env.PORT
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});