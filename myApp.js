
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// --> 7)  Mount the Logger middleware here
app.use(function(req,res,next){
  var string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

// --> 11)  Mount the body-parser middleware  here
app.use(bodyParser.urlencoded({extended: false}));

/** 1) Meet the node console. */
console.log("Hello World");

/** 2) A first working Express Server */
app.get("/",function(req,res){
    res.sendFile(__dirname+'/views/index.html');
});

/** 3) Serve an HTML file */
app.get("/",function(req,res){
    res.sendFile(__dirname+'/views/index.html');
});

/** 4) Serve static assets  */
app.use(express.static(__dirname+'/public'));

/** 5) serve JSON on a specific route */
app.get('/json',function(req,res){
  if(process.env.MESSAGE_STYLE=='uppercase')
    resposeJson={'message': 'HELLO JSON'};
  else
    resposeJson = {'message': 'Hello json'};
res.send(resposeJson);
});

/** 6) Use the .env file to configure the app */
 process.env.MESSAGE_STYLE='uppercase';
 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !
// app.use(function(req,res,next){
//   console.log('%s %s - %s',req.method(),req.path,req.ip);
//   next();
// });

/** 8) Chaining middleware. A Time server */
app.get('/now',function(req,res,next){
   req.time = new Date().toString();
  next();
}, function(req, res) {
   resJson = {'time':req.time};
  console.log(resJson);
  res.send(resJson);
});

/** 9)  Get input from client - Route parameters */
app.get('/:word/echo',function(req,res){
  var echoResp= {echo:req.params.word};
  res.send(echoResp);
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.route('/name').get(function(req,res){
  var echoResp= {name : req.query.first+' '+req.query.last};
  res.send(echoResp);
});
// .
// post(function(req,res){
//   var echoResp= {name : req.query.first+' '+req.query.last};
//   res.send(echoResp);
// });
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !
app.post('/name',function(req,res){
    var echoResp= {name : req.body.first+' '+req.body.last};
  res.send(echoResp);
});

/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
