//local dependencies
var util = require('../utilities/utils.js');
var roomHandler = require('../utilities/roomHandler.js');


var onRoomJoinLeave = function(socket, WorldRooms){
  //join the specified room
  socket.on("joinRoom", function(data){
    var exists = roomHandler.checkRoomExist(WorldRooms, data.roomName);
    if(exists == true){
      socket.join(data.roomName);
      socket.broadcast.to(data.roomName).emit('message', {username:socket.username, color:data.color, message:socket.username +" has joined the room."});
      util.sendServerMessage(socket, "You have successfully joined the room " + data.roomName);
      socket.currentRooms.push(data.roomName);
    }
    else{
      util.sendServerMessage(socket, "There is no room of the name " + data.roomName);
    }
  });
  socket.on("leaveRoom", function(data){
    var exists = roomHandler.checkRoomExist(socket.currentRooms, data.roomName);
    if(exists == true){
      socket.leave(data.roomName);
      var index = socket.currentRooms.indexOf(roomHandler.retrieveRoomObject(socket.currentRooms, data.roomName));
      if (index > -1) {
        socket.leave(data.roomName);
        socket.currentRooms.splice(index, 1);
        util.sendServerMessage(socket, "You have successfully left the room " + data.roomName);

      }
    }
  });
}


module.exports.onRoomJoinLeave = onRoomJoinLeave;
