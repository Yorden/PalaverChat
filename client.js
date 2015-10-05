var io = require('socket.io-client');
//var socket = io.connect("https://palaver-server.herokuapp.com/");//used to connect to the heroku server
var stdin = process.stdin;
var socket = io.connect("http://localhost:5000");//used to connect to the localhost for testing

console.log("trying to connect")
var userName = ""
var userColor = "";
//run this client if you want to test to see if the server is running
socket.on("connect", function(){
//inital connection
  console.log("connection established");

  socket.emit("messageServer", { username:userName, message:"CONNECTION TEST ESTABLISHED" });

  //this interval will send a message to all users and the server to test.
  //it will send the messages every 5 seconds
  setInterval(function(){
    //socket.emit("messageServer", { username:"TEST", message:"CONNECTION TEST ESTABLISHED" });
    //socket.emit("messageAll", { username:userName, message:"CONNECTION TEST ESTABLISHED" });
    //socket.emit("requestClientList");

  }, 5000);

	//when a message is recieved
	socket.on("message",function(data){
	  console.log(data.username + ": " + data.message);
	});

  socket.on("receiveUserMetadata", function(data){
    userName = data.username.toString();
    userColor = data.usercolor.toString();
    console.log(data.username + " " + data.usercolor);
  });
  stdin.on('data', function (data) {
    var Str = data.toString().substr(0, data.length -1);
    console.log(Str);
    //console.log(data.toString().substr(0,) + "|");
      if(Str.substr(0,8) == "/newroom"){
        var name = Str.substr(9);
        socket.emit("roomTryJoinCreate",{roomName:name});
      }
      if(Str.substr(0,9) == "/allrooms"){
        console.log('ass');
        socket.emit("requestAllRooms");
      }
      if(Str.substr(0,8) == "/myrooms"){
        socket.emit("requestAllRooms");
      }
      if(Str.substr(0,8) == "/message"){
        var name = Str.substr(9);
        console.log("asd")
        socket.emit("messageRoom", {roomName:name, message:"TEST TO THIS ROOM",username:userName});
      }

  });



});
