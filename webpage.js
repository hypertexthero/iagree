
function startServer()
{
	var server = app.listen(3000, function () {
	  var host = server.address().address;
	  var port = server.address().port;

	  console.log('Example app listening at http://%s:%s', host, port);
	});
}

function displayLoginPage(res1, msg)   // #1
{
	var fs = require('fs');
	var path = require('path');
  // var filePath = 'webpageLogin.html';
  var filePath = 'login.html';
  

	console.log("I am here: " + msg);

	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			res1.send(data);
		}else{
			console.log(err);
		}
	});

}

function displayDashboardPage(res1, user_id)  // #2
{
	var fs = require('fs');
	var path = require('path');
  // var filePath = 'webpageDashboard.html';
  var filePath = 'dashboard.html';

	console.log("user_id here: " + user_id);

	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			res1.send(data);
		}else{
			console.log(err);
		}
	});

}

function displayBoardroomPage(res1, user_id, contract_id, action, section)  // #3
{
	var fs = require('fs');
	var path = require('path');
  // var filePath = 'webpageBoardroom.html';
	var filePath = 'boardroom.html';

	console.log("user_id and contract_id here: " + user_id + " " + contract_id, + " " + action);

	fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
		if (!err){
			res1.send(data);
		}else{
			console.log(err);
		}
	});

}

//////////////////////

var http = require('http')
, express = require('express');  

var app = express();  
var path = require('path');


app.use(express.static('public'));



var loginDone = false;

app.get('/', function (req, res) {
  var user_id = req.query.id;   // replaces req.param('id') which is depreciated
  var contract_id = req.query.contract;
  var expand_section = req.query.expand;
  var update_section = req.query.update;
  
  var msg = 'Hello World! user= ' + user_id + " " + contract_id;
  msg = user_id;
  if (typeof(contract_id) != "undefined") displayBoardroomPage(res, user_id, contract_id, "display",0);
  else {
  if (typeof(expand_section) != "undefined") displayBoardroomPage(res, user_id, contract_id, "expand", expand_section);
  else {
  if (typeof(update_section) != "undefined") displayBoardroomPage(res, user_id, contract_id, "expand", update_section);
  else {
	  if (typeof(user_id) != "undefined") { loginDone=true; displayDashboardPage(res, user_id); }
	  else {  
		if (!loginDone) displayLoginPage(res, msg); 
		else displayDashboardPage(res, user_id);
	}  
  }
  }
  }
});

startServer();
