var app=require('http').createServer();
var io=require('socket.io')(app);

var PORT = 3000

var clientCount=0;
app.listen(PORT);
io.on('connection',function(socket){
	clientCount++;
	socket.nickName='user'+clientCount;
	io.emit('enter',socket.nickName+' comes in');

	socket.on('message',function(str){
		io.emit('message',socket.nickName+' say: '+str);
	})
	socket.on('disconnect',function(){
		io.emit('leave',socket.nickName+' left');
	})
});

console.log("websocket server listening on port " + PORT);
